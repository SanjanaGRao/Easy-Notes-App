const noteService = require('../../service/note.service');
const dtoObj = require("./note.responseSchema");
let responseObject;
const { application } = require('express');

class noteOperations {
    // Create and Save a new Note
    create = (req, res) => {
        let body = req.body;
        let color = req.body.color;
        let filename= (req.file===undefined)?(undefined):(req.file.filename);
        noteService.createANewNote(body, color, filename, (err, data) => {
            if (err) {
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;s
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Retrieve and return all notes from the database.
    findNotes = (req, res) => {
        noteService.findAllNotes(req.body.userId).then(notes => {
            res.send(notes);
        }).catch(err => {
            logger.error(err.message)
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    };

    // Find a single note with a noteId
    findOne = (req, res) => {
        let id = req.params.noteId;
        noteService.findOnlyOneNote(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.noteApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.noteApiFindFailure;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Update a note identified by the noteId in the request
    update = (req, res) => {
        let id = req.params.noteId;
        let body = req.body;
        let trash = req.body.isTrash;
        let color = req.body.color;
        let filename= (req.file===undefined)?(undefined):(req.file.filename);
        noteService.updateANote( req.params.userId, id, body, trash, color, filename).then(note => {
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                responseObject = dtoObj.noteApiFindFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            } 
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        let id = req.params.noteId;
        let userId = req.params.userId;
        noteService.deleteANote(userId, id).then(note => {
            res.send({message: "Note deleted "});
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    };
}
module.exports = new noteOperations();