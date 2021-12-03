/*
 * @description     : To get the values from the controller and process them for the labels in fundoNotes
 * @file            : label.service.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 01-12-2021
 */
const labelModel = require("../models/label.model");

class LabelService {
  /**
   * @description extracting details to create a new label in the model
   * @param {String} title
   * @param {String} userId
   * @returns data
   */
  createNewLabel = (title, userId) => {
     return labelModel.createLabel(title,userId);
  };

  /**
   * @description find all labels
   * @param {String} userId
   * @returns data
   */
  findAllLabels = (userId) => {
      return labelModel.findLabels(userId);
  };

  /**
   * @description find a single label
   * @param {String} userId
   * @param {String} findId
   */
  findLabel = (findId, userId) => {
      return labelModel.findSingleLabel(findId, userId);
  };

  /**
   * @description Find label and update it with the request body
   * @param {String} findId
   * @param {String} userId
   * @param {String} title
   */
  updateLabel = (findId, title, userId) => {
      return labelModel.findSingleLabelAndUpdate(
        findId,
        title,
        userId
      );
  };

  /**
   * @description delete a label
   * @param {String} findId
   * @param {String} userId
   */
  deleteById =(findId, userId) => {
      return labelModel.findAndRemove(findId, userId);
  };
}

module.exports = new LabelService();
