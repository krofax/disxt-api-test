/**
 * @param {Number} statusCode - status code of the response
 * @param {string} message - message identify the code
 * @param {{}} payload - response object
 * @param {Error} error - error message
 * @param {Token} token - jwt token
 * @returns {{}}
 */

export default function (statusCode, message, payload, errors, token) {
  return {
    statusCode,
    message,
    payload,
    errors,
    token,
  };
};
