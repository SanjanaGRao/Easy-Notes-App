/**
 * @file            : note.service.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 15-10-2021
 */
const noteModels = require("../models/note.model");

class NoteService {
  /**
   * @description extracting details to create a new note in the model
   * @param {String} body
   * @param {String} color
   * @param {callback} callback
   * @param {String} filename
   * @returns error or data
   */
  createANewNote = (body, color, filename, callback) => {
    noteModels.createNote(
      body.title,
      body.content,
      body.userId,
      color,
      filename,
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  /**
   * @description find all notes
   * @param {callback} callback
   * @param {String} userId
   * @returns error or data
   */
  findAllNotes = (userId) => {
    return noteModels.findNotes(userId);
  };

  /**
   * @description find a single note
   * @param {String} userId
   * @param {String} findId
   * @param {callback} callback
   */
  findOnlyOneNote = (userId, findId, callback) => {
    noteModels.findOneNote(userId, findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description Find note and update it with the request body
   * @param {String} findId
   * @param {String} color
   * @param {Object} body
   * @param {String} userId
   */
  updateANote = (userId, findId, body, trash, color, filename) => {
    return noteModels.updateNote(userId, findId, body, trash, color, filename);
  };

  /**
   * @description delete a note
   * @param {String} findId
   * @param {String} userId
   */
  deleteANote = (userId, findId) => {
    return noteModels.deleteNote(userId, findId);
  };
}

module.exports = new NoteService();
