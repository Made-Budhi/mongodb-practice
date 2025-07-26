const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false,
    default: 'Anonymous'
  },
}, {
  timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;