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
   * @returns data
   */
  createNewLabel = (title) => {
     return labelModel.createLabel(title);
  };

  /**
   * @description find all labels
   * @returns data
   */
  findAllLabels = () => {
      return labelModel.findLabels();
  };

  /**
   * @description find a single label
   * @param {String} findId
   */
  findLabel = (findId) => {
      return labelModel.findSingleLabel(findId);
  };

  /**
   * @description Find label and update it with the request body
   * @param {String} findId
   * @param {String} title
   */
  updateLabel = (findId, title) => {
      return labelModel.findSingleLabelAndUpdate(
        findId,
        title,
      );
  };

  /**
   * @description delete a label
   * @param {String} findId
   */
  deleteById =(findId) => {
      return labelModel.findAndRemove(findId);
  };
}

module.exports = new LabelService();
