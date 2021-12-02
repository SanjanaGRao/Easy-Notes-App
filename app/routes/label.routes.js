/*
 * @description     : Label routes
 * @file            : label.routes.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 01-12-2021
 */
const express = require("express");
const labelRouter = express.Router(); 
const labels = require("../controllers/labels/labels.controller");

//create a new label
labelRouter.post("/", labels.create);

//Find all labels
labelRouter.get("/",  labels.findAll);

//Find a single label with labelId
labelRouter.get("/:labelId",  labels.findOne);

//Update a label with labelId
labelRouter.put("/:labelId",  labels.update);

//Delete a label with labelId
labelRouter.delete("/:labelId", labels.deleteOne);

module.exports = labelRouter; 