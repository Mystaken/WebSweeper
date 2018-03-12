'use strict';

module.exports = {

  /**
   * Return an array of the object's keys.
   * @param {Object} the input object
   *
   * @return {Array of Object} the keys of the input object
   */
  objKeys: function(obj) {
    var res = [],
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        res.push(key);
      }
    }
    return res;
  },

  /**
   * Return an array of the object's values.
   * @param {Object} the input object
   *
   * @return {Array of Object} the values of the input object
   */
  objValues: function(obj) {
    var res = [],
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        res.push(obj[key]);
      }
    }
    return res;
  }
};