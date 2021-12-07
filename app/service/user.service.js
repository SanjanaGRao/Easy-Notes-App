/**
 * @file            : user.service.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */
const userModels = require("../models/user.model");
const jwtHelper = require("../../utils/jwt");
const emailer = require("../../utils/nodeMailer");
const bcrypt = require("bcrypt");

class UserService {
  /**
   * @description logging in for a user
   * @param {Object} userDetails
   * @param {callback} callback
   * @returns error or data
   */
  loginUser = (object, callback) => {
    userModels.loginUser(object, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        if (bcrypt.compareSync(object.password, data.password)) {
          var token = jwtHelper.generateToken(data._id);
          var result = { data: data, Token: token };
          return callback(null, result);
        } else {
          return callback("Mismatch in Password");
        }
      }
    });
  };

  /**
   * @description extracting details to create a new user in the model
   * @param {Object} userDetails
   * @param {callback} callback
   * @returns error or data
   */
  createANewUser = (object, callback) => {
    userModels.createUser(object, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description query to find all the users
   * @param {callback} callback
   * @returns error or data
   */
  findAllUsers = (callback) => {
    userModels.findUser((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description extracting id to find user
   * @param {String} findId
   * @param {callback} callback
   * @returns error or data
   */
  findOnlyOneUser = (findId) => {
    return userModels.findOneUser(findId);
  };

  /**
   * @description extracting user details to update user info
   * @param {Object} object
   * @param {callback} callback
   * @returns error or data
   */
  updateAUser = (findId, object, callback) => {
    userModels.updateUser(findId, object, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description extracting user id to delete an user by passing the userId
   * @param {String} findId
   * @param {callback} callback
   * @returns error or data
   */
  deleteAUser = (findId, callback) => {
    userModels.deleteUser(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description extracts details to send the mail
   * @param {String} email
   * @returns error or data
   */
  forgotPassword = (email) => {
    return userModels
      .forgotPassword(email)
      .then((data) => {
        return emailer
          .mailer(data.email, data.resetPasswordToken)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  /**
   * @description extracts details to reset password
   * @param token
   * @param password
   * @returns error or data
   */
  resetPassword = (token, password) => {
    return userModels
      .resetPassword(token, password)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
}

module.exports = new UserService();
