'use strict';

const config = require('../config/mailgun.json'),
  mailgun    = require('mailgun-js')(config);

module.exports = {
  /** Sends a mail to the user
   *
   * @param opt.from {String}     The email of person sending
   * @param opt.to {String}       The email of recipent
   * @param opt.subject {String}  The subject of email
   * @param opt.text {String}     The contents of this email
   * @param opt.html {String}     The html to be sent as the body.
   * 
   * @return {Promise} A promise with the response of the mail
   */
  promiseSendMail: function(data) {
    opt.form = opt.form || config.from;
    return mailgun.messages().send(data);
  }
};