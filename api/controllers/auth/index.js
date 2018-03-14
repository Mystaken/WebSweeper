'use strict';

/**
 * @apiDefine ExtraFieldsError
 *
 * @apiError ExtraFields Extra fields in the request
 *
 * @apiErrorExample {json} ExtraFields
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": "OBJECT_ADDITIONAL_PARAM",
 *       "fields": ["burger", "sandwich"] // will include all extra fields
 *     }
 */
/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFound Entity not found or inactive.
 *
 * @apiErrorExample {json} NotFound
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": "NOT_FOUND",
 *       "fields": ["username"]
 *     }
 */
module.exports = function (router) {

};