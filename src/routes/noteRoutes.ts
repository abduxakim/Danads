import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController';
import { validateCreateNote, validateUpdateNote } from '../middleware/validateNote';

const router = express.Router();

// GET /notes - Get all notes
router.get('/', getAllNotes);

// GET /notes/:id - Get single note
router.get('/:id', getNoteById);

// POST /notes - Create note
router.post('/', validateCreateNote, createNote);

// PUT /notes/:id - Update note
router.put('/:id', validateUpdateNote, updateNote);

// DELETE /notes/:id - Delete note
router.delete('/:id', deleteNote);

export default router;