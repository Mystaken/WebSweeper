const moment   = require('moment'),
  colors       = require('colors'),
  DEFAULT_MASK = 5,
  DEFAULT_LOG  = console.log;

/**
 * Returns the current formatted date.
 */
function getDate() {
  var date = moment().format('MM/DD/YYYY, HH:mm:ss');
  return `[${date}]`;
}

log = DEFAULT_LOG;
mask = DEFAULT_MASK;

module.exports = {
  fatal: function(str) {
    if (mask > 0) {
      log(getDate().red, '[FATAL]'.red, str.toString().red);
    }
  },

  error: function(str) {
    if (mask > 1) {
      log(getDate().red, '[ERROR]'.red, str.toString().red);
    }
  },

  warn: function(str) {
    if (mask > 2) {
      log(getDate().yellow, '[WARN]'.yellow, str.toString().yellow);
    }
  },

  info: function(str) {
    if (mask > 3) {
      log(getDate(), '[INFO]', str.toString());
    }
  },

  debug: function(str) {
    if (mask > 4) {
      log(getDate().grey, '[DEBUG]'.grey, str.toString().grey);
    }
  },

  setup: function(opt){
    log = opt.log || DEFAULT_LOG;
    mask = opt.mask || DEFAULT_MASK;
  }
}
