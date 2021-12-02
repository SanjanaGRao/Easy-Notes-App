/**
 * @file            : label.middleware.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */

const jwtHelper = require("../../utils/jwt");

const labelValidate = (req, res, next) => {
  //check if title is present
  if (!req.body.title) {
    return res.status(400).send({
      message: "Label content can not be empty",
    });
  }

  //validate title name
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    return res.status(400).send({
      message: "Label does not contain a valid title name",
    });
  } else {
    next();
  }
};

/**
 * @description function to verify user for authentication
 * @param {Object} req
 * @param {Object}  res
 * @param {Object} next
 * @returns
 */
const ensureTokenLabel = (req, res, next) => {
  const bearerHeader = req.headers["authorization"] || req.headers.token;
  if (!bearerHeader) {
    res.send("Empty Token.");
  }
  const token = bearerHeader;
  jwtHelper.verifyToken(token, (err, data) => {
    if (err) {
      res.send(err);
    }
    req.body.userId = data._id;
    next();
  });
};

module.exports = { labelValidate, ensureTokenLabel };
