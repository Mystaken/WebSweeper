// jshint esversion: 6
'use strict';

const User    = require('../../models/userModel'),
  validator   = require('../../lib/validator'),
  mail        = require('../../lib/mail'),
  middlewares = require('../../lib/middlewares'),
  status      = require('../../config/status.json').users,
  error       = require('../../config/error.json'),
  config      = require('../../config/config.json'),

  sanitizer = require('sanitizer'),
  bcrypt    = require('bcrypt'),
  path      = require('path'),
  pug       = require('pug'),

  SALT_LEN   = 10,
  EMAIL_PATH = path.join(__dirname, '../../views/users/verification.pug'),
  VERIFICATION_ROUTE = `${config.app.DOMAIN}/api/users/verification`,

  usersPostSchema      = require('../../schemas/users/users_post.json'),
  usersLoginPostSchema = require('../../schemas/users/users_login_post.json');


module.exports = function (router) {

  /**
   * @api {POST} api/users/login User Login
   * @apiGroup User
   * @apiName UserLogin
   * @apiPermission none
   * @apiDescription Logs the user in.
   *
   * @apiParam {String} username the username of the login user
   * @apiParam {String} password the password for the account
   *
   * @apiSuccess {String}  id the id of the user
   * @apiSuccess {String}  username Username of the user
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created (DD-MM-YYYY HH:MM)
   * @apiSuccess {Date} updatedAt  The date this user was last updated (DD-MM-YYYY HH:MM)
   *
   *
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *        "id": "5935ed0e5ecf04cc3388de8e"
   *        "username": "websweeper",
   *        "email": "example@mail.com",
   *        "createdAt": "21-12-2017 15:30",
   *        "updatedAt": "21-12-2017 15:30"
   *       }
   *     }
   * @apiUse InvalidLoginError
  */
  router.route('/login').post(function(req, res, next) {
    var err,
      loginUser;

    validator.validate(req.body, usersLoginPostSchema);
    err = validator.getLastErrors();
    if (err) {
      return res.requestError(400, err);
    }

    return User.findOneAndUpdate({
        username: req.body.username,
        status: status.ACTIVE
      },{
        lastLogin: new Date()
      },{
        _id: 1,
        username: 1,
        email: 1,
        createdAt: 1,
        lastLogin: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$last_login"
          }
        },
        password: 1
    }).exec().then(function(user) {
      loginUser = user;
      if (!user) {
        return Promise.reject({
          status: 400,
          data: [{
            code: error.ACCESS_DENIED,
            fields: [ '#/username', '#/password' ]
          }]
        });
      }
      return bcrypt.compare(req.body.password, loginUser.password);
    }).then(function(samePass) {
      if (!samePass) {
        return Promise.reject({
          status: 401,
          data: [{
            code: error.ACCESS_DENIED,
            fields: [ '#/username', '#/password' ]
          }]
        });
      }
      req.session.user_id = loginUser._id;
      return res.sendResponse({
          id: loginUser._id,
          username: loginUser.username,
          email: loginUser.email,
          createdAt: loginUser.createdAt,
          lastLogin: loginUser.lastLogin
        });
    }).catch((err) => res.handleError(err));
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

  /**
   * @api {POST} api/users/ Create User
   * @apiGroup User
   * @apiName PostUser
   * @apiPermission none
   * @apiDescription Creates a new user and sends a verification link to the email.
   *
   * @apiParam {String} username Username of the new user (min length = 3, max length = 20)
   * @apiParam {String} email Email of the new user (min length = 3, max length = 100)
   * @apiParam {String} password Password of the new user (min length = 8, max length = 20)
   * @apiParamExample {json} Sample Request Body
   *     {
   *       "username": "websweeper",
   *       "email": "example@mail.com",
   *       "password": "superpassword"
   *     }
   *
   * @apiSuccess {String} username Username of the new user
   * @apiSuccess {String} email Email of the new user
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "username": "websweeper",
   *         "email": "example@mail.com"
   *       }
   *     }
   * @apiUse ExistError
   * @apiUse MissingFieldsError
   * @apiUse ExtraFieldsError
   * @apiUse MaxLengthError
   * @apiUse MinLengthError
  */
  router.route('/').post(function(req, res, next) {
    var err;

    // validate input
    validator.validate(req.body, usersPostSchema);
    err = validator.getLastErrors();
    if (err) {
      return res.requestError(400, err);
    }

    // sanitize username / email
    req.body.username = sanitizer.sanitize(req.body.username);
    req.body.email = sanitizer.sanitize(req.body.email);

    // check if user exists
    return User.aggregate([
    {
      $match: {
        $or: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    }]).exec().then(function(user) {
      if (user && user.length) {
        return Promise.reject({
          status: 409,
          data: [{
            code: error.EXISTS,
            fields: [ '#/username', '#/email' ]
          }]
        });
      }
      return bcrypt.hash(req.body.password, SALT_LEN);
    }).then(function(hashPass) {
      // create pending user
      return new User({
        username: req.body.username,
        password: hashPass,
        email: req.body.email,
        status: status.PENDING,
        lastLogin: new Date()
      }).save();
    }).then(function(user) {
      // generate email to send
      var htmlContent = pug.renderFile(EMAIL_PATH, {
        username: req.body.username,
        verifyLink: `${VERIFICATION_ROUTE}/${user._id}`
      });
      // send email
      return mail.promiseSendMail({
        to: req.body.email,
        subject: 'Web Sweeper Sign-up',
        html: htmlContent
      });
    }).then(function() {
      return res.sendResponse({
        email: req.body.email,
        username: req.body.username
      });
    }).catch((err) => res.handleError(err));

  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

  /**
   * @api {GET} api/users/:id Get User Info
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission none
   * @apiDescription Return this user's information.
   *
   * @apiParam {String} id the id of the user
   *
   * @apiSuccess {String}  id the id of the user
   * @apiSuccess {String}  username Username of the user
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created (DD-MM-YYYY HH:MM)
   * @apiSuccess {Date} updatedAt  The date this user was last updated (DD-MM-YYYY HH:MM)
   *
   *
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *        "id": "5aac8bcd0ae1b610fc1a5160"
   *        "username": "websweeper",
   *        "email": "example@mail.com",
   *        "createdAt": "21-12-2017 15:30",
   *        "updatedAt": "21-12-2017 15:30"
   *       }
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  router.route('/:id').get(function(req, res, next) {
  })

  /**
   * @api {PATCH} api/users/:id Update User Info
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission must be same as login user
   * @apiDescription Update this user's information and return it's updated information.
   *
   * @apiParam {String} id the id of user
   * @apiParam {String} username (Optional) the new username of user
   * @apiParam {String} email (Optional) the new email of user
   * @apiParamExample {json} Sample Request Body
   *     {
   *       "username": "websweeperchanged",
   *       "email": "newexample@mail.com"
   *     }
   * @apiSuccess {String}  username Username of the user.
   * @apiSuccess {String}  email Email of the user
   * @apiSuccess {Date} create_at  The date this user was created (DD-MM-YYYY HH:MM).
   * @apiSuccess {Date} updatedAt  The date this user was last updated (DD-MM-YYYY HH:MM).
   *
   *
   * @apiSuccessExample {json} Success Response
   *     HTTP/1.1 200 OK
   *     {
   *       status: 200,
   *       data: {
   *         "username": "websweeperchanged",
   *         "email": "newexample@mail.com",
   *         "createdAt": "21-12-2017 15:30",
   *         "updatedAt": "21-12-2017 15:30"
   *       }
   *     }
   * @apiUse NotFoundError
   * @apiUse ExtraFieldsError
  */
  .patch(function(req, res, next) {
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });


  /**
   * @api {POST} api/users/verification/:ticket Verify User
   * @apiGroup Auth
   * @apiName VerifyUser
   * @apiPermission none
   * @apiDescription Verifies the user's email with the link sent to the email.
   *
   * @apiParam {String} ticket the ticket sent in the verification link
   *
   * @apiSuccess {HTML}  html the html to be displayed
  */
  router.route('/verification/:ticket').get(function(req, res, next) {
    return User.findOneAndUpdate(
      { _id: req.params.ticket },
      { status: status.ACTIVE }
    ).exec().then(function(ret) {
      return res.json({a:'YAY'});
    }).catch((err) => res.handleError(err));

  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

  /**
   * @api {POST} api/users/:username/verification/resend/ Resend verification link
   * @apiGroup Auth
   * @apiName ResendLink
   * @apiPermission none
   * @apiDescription Re-sends the verification link to the given user's email.
   *
   * @apiParam {String} username the username to be resent
   *
   * @apiUse ExtraFieldsError
   * @apiUse NotFoundError
  */
  router.route('/:username/verification/resend').post(function(req, res, next) {
  }).all(function (req, res, next) {
    return res.invalidVerb();
  });

};