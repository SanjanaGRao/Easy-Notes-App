/**
 * @file            : note.dbConnect.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */
const mongoose = require('mongoose');
const dbConfig = require('./database.config');
const logger = require('../config/winston_logger');
/**
 * @description connection to mongoDB database
 */
const dbConnect = () => {
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
        logger.info("Connected to Database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = dbConnect();