const logger = require('../../../config/winston_logger');
const userService = require('../../service/user.service');
const {validationResult} = require('express-validator');
const dtoObj = require("./user.responseSchema");
let responseObject;

class userOperations {
    //For user to login
    loginUser = (req, res) => {
        let object = req.body;
        console.log(object);
        userService.loginUser(object, (err, data) => {
            if (err) {
                logger.error(err);
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err;
                return res.send(responseObject);
            }
            logger.info("Successfully logged in");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            console.log(responseObject);
            return res.send(responseObject);
        });
    };

    // Create and Save a new user
    createUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            responseObject = dtoObj.userApiFailure;
            responseObject.message = errors.array();
            return res.send(responseObject);
        }
        let object = req.body;
        userService.createANewUser(object, (err, data) => {
            if (err) {
                logger.error(err);
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            logger.info("Registeration Successful");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            return res.send(responseObject);
        });
    };

    // Retrieve and return all users from the database.
    findAll = (req, res) => {
        userService.findAllUsers((err, data) => {
            if (err) {
              logger.error(err);
              responseObject = dtoObj.userApiFailure;
              responseObject.message = err.message;
              return res.send(responseObject);
            }
            logger.info("Successfully retrived all the users.");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            return res.send(responseObject);
          });
    };

    // Find a single user with a userId
    findOneUser = (req, res) => {
        let email = req.params.userId;
        userService.findOnlyOneUser(email, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    return res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                return res.send(responseObject);
            }
            logger.info("Successfully retrieved");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            return res.send(responseObject);
        });
    };

    // Update a user detail identified by the userId in the request
    update = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let id = req.params.userId;
        let object = req.body;
        userService.updateAUser(id, object, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    return res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                return res.send(responseObject);
            }
            logger.info("Succesfully updated");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Succesfully updated";
            return res.send(responseObject);
        });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        let id = req.params.userId;
        userService.deleteAUser(id, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    return res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                res.send(responseObject);
            }
            logger.info("Deleted succesfully");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Deleted successfully";
            return res.send(responseObject);
        });
    };

    //If the user forgets password
    forgotPassword = (req, res) => {
        let email = req.body.email;
        userService
            .forgotPassword(email)
            .then((data) => { return res.send("Result:" + data); })
            .catch((err) => {
                return res.send(err);
            });
    };

    //Reset Password
    resetPassword = (req, res) => {
        let token = req.params.token;
        let password = req.body.password;
        userService
            .resetPassword(token, password)
            .then((data) => {
                res.json({ message: "Password updated successfully", "Result:": data });
            })
            .catch((err) => {
                console.log("error:" + err);
                return res.send(err);
            });
    };
}
module.exports = new userOperations();