const noteModels = require('../models/note.model');

class noteService {
    createANewNote = (body, color, filename, callback) => {
        noteModels.createNote(body.title, body.content, body.userId, color, filename, (err,data)=>{
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find all notes
    findAllNotes = (userId) => {
        return noteModels.findNotes(userId)  ;     
    }

    //query to find a single note
    findOnlyOneNote = (userId, findId, callback) => {
        noteModels.findOneNote(userId, findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    // Find note and update it with the request body
    updateANote = (userId, findId, body, trash, color, filename) => {
        return noteModels.updateNote(userId, findId, body, trash, color, filename ) ; 
    }

    //query to delete a note
    deleteANote = (userId, findId) => {
        return noteModels.deleteNote(userId, findId);
    }
}

module.exports = new noteService();