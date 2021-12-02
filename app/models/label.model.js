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
    title: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  createLabel = (title,userId) => {
    const label = new Label({
      title: title,
      userId: userId
    });
    return label.save();
  };

  /**
   * @description Query to find all labels
   * @returns data
   */
  findLabels = (userId) => {
      return Label.find({ userId: userId }).populate({
        path: "userId",
        select: ["email"],
      });
  };

  /**
   * @description Query to find one specific note
   * @param {String} id
   * @returns data
   */
  findSingleLabel = (userId, id) => {
    return Label.findById({ userId: userId, _id: id });
  };

  /**
   * @description Query to find and update note
   * @param {String} id
   * @param {String} title
   * @returns data
   */
  findSingleLabelAndUpdate = (id, title, userId) => {
    return Label.findByIdAndUpdate({ userId: userId, _id: id }, 
    {
        title:title
    },
     {new: true}
    )
  };

  /**
   * @description Query to find and remove a label
   * @param {String} id
   * @returns data
   */
  findAndRemove = (id, userId) => {
    return Label.findByIdAndRemove({userId: userId, _id: id});
  };
}

module.exports = new LabelModel();
