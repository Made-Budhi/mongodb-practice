const Note = require("../models/note.model");

// --- 1. Get All Notes ---
// @desc    Get all notes from the database
// @route   GET /api/notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

// --- 2. Get a Single Note by ID ---
// @desc    Get one note by its unique ID
// @route   GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching note", error: error.message });
  }
};

// --- 3. Create a New Note ---
// @desc    Add a new note to the database
// @route   POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Basic validation
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      title,
      content,
      author,
    });

    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: savedNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

// --- 4. Update a Note by ID ---
// @desc    Update an existing note by its ID
// @route   PUT /api/notes/:id
exports.updateNoteById = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true } // {new: true} returns the updated document
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
};

// --- 5. Delete a Note by ID ---
// @desc    Delete a note by its ID
// @route   DELETE /api/notes/:id
exports.deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
