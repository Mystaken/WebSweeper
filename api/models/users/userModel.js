// jshint esversion: 6
'use strict';

const mongoose = require('mongoose'),
  status   = require('../../config/status.json'),
  config = require('../../config/config.json'),
  utils  = require('../../lib/utils'),
  pug    = require('../../lib/pug'),
  mail   = require('../../lib/mail'),
  bcrypt = require('bcryptjs'),
  path   = require('path'),
  SALT_LEN   = 10,
  EMAIL_PATH = path.join(__dirname, '../../templates/users/verification.pug'),
  VERIFICATION_ROUTE = `${config.app.DOMAIN}/api/auth/verification`;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: utils.objValues(status),
    required: true
  },
});

/* The model to create new user. */
const User = mongoose.model('users', userSchema);

module.exports = {
  /**
   * Creates a new user and sends them a verification email.
   * @param opt.username {String} the username of the user
   * @param opt.password {String} the password of the user
   * @param opt.email {String} the email of the user
   *
   * @return {Promise} a promise with the newly created user.
   * NOTE: 
   *  - the result password is a salted hash.
   *  - username and email must not be in database
   */
  createUser: function(opt) {
    return bcrypt(opt.password, SALT_LEN).then(function(hashPass) {
      // create pending user
      return new User({
        username: opt.username,
        password: hashPass,
        email: opt.email,
        status: status.PENDING
      }).save();
    });
  },

  /**
   * Sends a verification email for the user.
   * @param opt.username {String} the username of the user
   * @param opt.password {String} the password of the user
   * @param opt.email {String} the email of the user
   *
   * @return {Promise} a promise with the newly created user.
   */
  sendVerification: function(opt) {
    var htmlContent = pug.renderFile(EMAIL_PATH, {
      username: opt.username,
      verifyLink: `${VERIFICATION_ROUTE}/${opt.id}`
    });
    return mail.promiseSendMail({
      to: opt.email,
      subject: 'Web Sweeper Sign-up',
      html: htmlContent
    });
  },

  /**
   * Returns the user information from the database.
   * @param id {String} the id of the user
   *
   * @return {Promise} a promise with the information of the user.
   */
  getUser: function(id) {
    return User.find({_id: id}).exec();
  },

  /**
   * Update the data for a current user.
   * @param id {String} the id of the user
   * @param opt.username {String} the username of the user
   * @param opt.email {String} the email of the user
   *
   * @return {Promise} a promise with the newly updated user.
   */
  updateUser: function(id, opt) {
    return User.findByIdAndUpdate(id, { $set: opt }, { new: true }).exec();
  },

  /**
   * Delete a user from the database. This does not set the status to 'INACTIVE'.
   * @param id {String} the id of the user
   *
   * @return {Promise} a promise with the user info.
   */
  deleteUser(id) {
    return User.findByIdAndRemove(id).exec();
  },

  /**
   * Set a user to be 'INACTIVE'.
   * @param id {String} the id of the user
   *
   * @return {Promise} a promise with the user info.
   */
  setInActive: function(id) {
    return User.findByIdAndUpdate(id, { $set: { status: status.INACTIVE } }, { new: true }).exec();
  }
};