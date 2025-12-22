import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController';
import {
  validateCreateNote,
  validateUpdateNote,
} from '../middleware/validateNote';

/*
|--------------------------------------------------------------------------
| Notes Routes
|--------------------------------------------------------------------------
| This file defines all HTTP routes related to notes.
| Routes only map URLs to controller functions.
| No business logic should live here.
|--------------------------------------------------------------------------
*/

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /notes
|--------------------------------------------------------------------------
| Retrieve all notes
| Supports:
| - search
| - filtering (status, priority, tags)
| - pagination (page, limit)
|--------------------------------------------------------------------------
*/
router.get('/', getAllNotes);

/*
|--------------------------------------------------------------------------
| GET /notes/:id
|--------------------------------------------------------------------------
| Retrieve a single note by its ID
|--------------------------------------------------------------------------
*/
router.get('/:id', getNoteById);

/*
|--------------------------------------------------------------------------
| POST /notes
|--------------------------------------------------------------------------
| Create a new note
| - Validation runs BEFORE controller
|--------------------------------------------------------------------------
*/
router.post('/', validateCreateNote, createNote);

/*
|--------------------------------------------------------------------------
| PUT /notes/:id
|--------------------------------------------------------------------------
| Update an existing note by ID
| - Partial updates allowed
|--------------------------------------------------------------------------
*/
router.put('/:id', validateUpdateNote, updateNote);

/*
|--------------------------------------------------------------------------
| DELETE /notes/:id
|--------------------------------------------------------------------------
| Delete a note by ID
|--------------------------------------------------------------------------
*/
router.delete('/:id', deleteNote);

export default router;
