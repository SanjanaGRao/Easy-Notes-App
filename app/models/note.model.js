/**
 * @file            : note.model.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */
const mongoose = require("mongoose");
/**
 * @description creation of schema for note collection
 */
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isTrash: Boolean,
    color: String,
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

class NoteModels {
  /**
   * @description Query to create a note and save in database
   * @param {String} title
   * @param {String} content
   * @param {String} userId
   * @param {String} color
   * @param {String} filename
   * @param {callback} callback
   * @returns result of callback
   */
  createNote = (title, content, userId, color, filename, callback) => {
    const note = new Note({
      title: title,
      content: content,
      userId: userId,
      isTrash: false,
      color: color,
      profileImg: filename,
    });
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description Query to find all notes
   * @param {String} userId
   * @returns error or promise
   */
  findNotes = (userId) => {
    return Note.find({ userId: userId }).populate({
      path: "userId",
      select: ["firstName", "lastName", "email"],
    });
  };

  /**
   * @description Query to find one specific note
   * @param {String} userId
   * @param {String} findId
   * @returns error or promise
   */
  findOneNote = (userId, findId) => {
    return Note.findOne({ userId: userId, _id: findId });
  };

  /**
   * @description Query to find and update note
   * @param {String} userId
   * @param {String} findId
   * @param {String} body
   * @param {Boolean} trash
   * @param {String} filename
   * @returns error or promise
   */
  updateNote = (userId, findId, body, trash, color, filename) => {
    return Note.findByIdAndUpdate(
      { userId: userId, _id: findId },
      {
        title: body.title,
        content: body.content,
        isTrash: trash,
        color: color,
        profileImg: filename,
      },
      { new: true }
    );
  };

  /**
   * @description Query to find and remove a note
   * @param {String} findId
   * @param {String} userId
   * @returns error or promise
   */
  deleteNote = (userId, findId) => {
    return Note.findByIdAndRemove({ userId: userId, _id: findId });
  };
}

module.exports = new NoteModels();
