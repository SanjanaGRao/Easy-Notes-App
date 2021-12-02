/*
 * @description     : to get the values from the service and process them for the label in fundooNotes
 * @file            : label.model.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 01-12-2021
 */
const mongoose = require("mongoose");

/**
 * @description Creation of schema for label collection
 */
const LabelSchema = mongoose.Schema(
  {
    title: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", LabelSchema);

class LabelModel {
  /**
   * @description Query to create a label
   * @param {String} title
   * @returns
   */
  createLabel = (title) => {
    const label = new Label({
      title: title,
    });
    return label.save();
  };

  /**
   * @description Query to find all labels
   * @returns data
   */
  findLabels = () => {
      return Label.find();
  };

  /**
   * @description Query to find one specific note
   * @param {String} id
   * @returns data
   */
  findSingleLabel = (id) => {
    return Label.findById(id);
  };

  /**
   * @description Query to find and update note
   * @param {String} id
   * @param {String} title
   * @returns data
   */
  findSingleLabelAndUpdate = (id, title) => {
    return Label.findByIdAndUpdate(id, {
        title:title
    })
  };

  /**
   * @description Query to find and remove a label
   * @param {String} id
   * @returns data
   */
  findAndRemove = (id) => {
    return Label.findByIdAndRemove(id);
  };
}

module.exports = new LabelModel();
