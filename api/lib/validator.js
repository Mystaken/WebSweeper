'use strict';
const ZSchema = require('z-schema'),
  moment      = require('moment');

var opt = {},
  validator;



ZSchema.registerFormat("date", function (date) {
  return date && moment(date, 'YYYY-MM-DD', true).isValid();
});

validator = new ZSchema(opt);

module.exports = {
  getLastErrors: function(opt) {
    var last_errors = validator.getLastErrors();
    if (last_errors) {
      return last_errors.map(function (err) {
        var path;
        if (err.code === 'OBJECT_ADDITIONAL_PROPERTIES') {
          path = err.params[0].map(function(param){
            return '#/' + param;
          });
        } else if (err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
          path = [ '#/' + err.params[0] ];
        } else {
          path = [ err.path ];
        }
        return {
          code: err.code,
          fields: path
        };
      });
    }
  },
  validate: function(json, schema) {
    return validator.validate(json, schema);
  },
  configure: function(opt) {
    return Promise.resolve();
  }
};