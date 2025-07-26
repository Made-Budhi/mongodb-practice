/* -------------------------------------------------------------------------- */
/* FILE: routes/note.routes.js (Corrected for Swagger - Final)               */
/* -------------------------------------------------------------------------- */
/*
  This file defines the API endpoints and includes correctly formatted
  JSDoc comments for Swagger to generate API documentation.
  This version uses a cleaner structure to avoid YAML parsing errors.
*/
const router = require('express').Router();
const noteController = require('../controllers/note.controller');

/**
 * @swagger
 * tags:
 *   - name: Notes
 *     description: API for managing notes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the note from MongoDB.
 *           example: "60d0fe4f5311236168a109ca"
 *         title:
 *           type: string
 *           description: The title of your note.
 *           example: "My First Note"
 *         content:
 *           type: string
 *           description: The content of the note.
 *           example: "This is the content of my first note."
 *         author:
 *           type: string
 *           description: The author of the note.
 *           example: "John Doe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the note was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the note was last updated.
 *     NoteInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title for the note.
 *           example: "A New Note"
 *         content:
 *           type: string
 *           description: The content for the note.
 *           example: "This is the content for the new note."
 *         author:
 *           type: string
 *           description: The author of the note (optional).
 *           example: "Jane Doe"
 */

// --- Routes for /api/notes ---

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Retrieve a list of all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Server error
 */
router.get('/', noteController.getAllNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       201:
 *         description: Note created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Bad request (e.g., missing title or content).
 *       500:
 *         description: Server error.
 */
router.post('/', noteController.createNote);

// --- Routes for /api/notes/:id ---

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to retrieve.
 *     responses:
 *       200:
 *         description: The requested note.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', noteController.getNoteById);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       200:
 *         description: Note updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', noteController.updateNoteById);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to delete.
 *     responses:
 *       200:
 *         description: Note deleted successfully.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', noteController.deleteNoteById);

module.exports = router;
