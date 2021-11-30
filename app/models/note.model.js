const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isTrash : Boolean, 
  color: String,
  profileImg: {
    type: String
  } 
},
{
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

class noteModels {
  createNote = (title, content, userId, color, filename, callback) => {
    const note = new Note({
      title: title,
      content: content,
      userId: userId,
      isTrash:false,
      color: color,
      profileImg:filename, 
    });
    // Save Note in the database
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //To find all notes
  findNotes = (userId) => {
    return Note.find({userId: userId})
    .populate({
      path: "userId",
      select: ["firstName", "lastName", "email"]
  })
  };

  //query to find a single note
  findOneNote = (userId, findId, callback) => {
    return Note.findOne({ userId: userId, _id: findId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You can't access this note", null);
      } else {
        return callback(null, data);
      }
    });
  }

  // Find note and update it with the request body
  updateNote = (userId, findId, body, trash, color, filename) => {
    return Note.findByIdAndUpdate(
      { userId: userId, _id: findId },
      {
        title: body.title ,
        content: body.content,
        isTrash: trash,
        color: color,
        profileImg:filename
      },
      { new: true })    
  }

  //query to delete a note
  deleteNote = (userId, findId) => {
    return Note.findByIdAndRemove({ userId: userId, _id: findId });
}
}

module.exports = new noteModels();