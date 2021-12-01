/**
 * @file            : note.middleware.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */
const jwtHelper = require("../../utils/jwt");
let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuid = require("uuid");
router = express.Router();
/**
 * @description to check if content is present and validating the title
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns status of the result
 */
const validate = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Insert something. Note content cannot be empty.",
    });
  }

  var regexPattern = new RegExp("^[A-Za-z]([a-zA-Z0-9\\s]+)*$");
  if (!regexPattern.test(req.body.title)) {
    return res.status(400).send({
      message: "Please enter a valid title with first letter capital.",
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
 */
const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"] || req.headers.token;
  if (!bearerHeader) {
    res.send("Empty Token.");
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  jwtHelper.verifyToken(token, (err, data) => {
    if (err) {
      res.send(err);
    }
    req.body.userId = data._id;
    next();
  });
};
/**
 * @description functions to upload image in the frontend
 * @param DIR is used to store images in a folder under app
 * @param storage stores the images coming from frontend
 * @param upload is used toupload images in .jpg, .png or .jpeg format
 */
const DIR = "C:/Users/sanjana.rao_ymediala/node-easy-notes-app/app/public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    return cb(null, uuid.v4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = {
  validate,
  ensureToken,
  upload,
};
