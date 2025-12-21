import { Request, Response, NextFunction } from 'express';
import noteService from '../services/noteService';
import { CreateNoteDto, UpdateNoteDto, NoteQuery } from '../models/noteModel';


export const getAllNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.query contains URL query parameters (?search=abc&page=1)
    // We cast it to NoteQuery so TypeScript understands the shape
    const query = req.query as NoteQuery;

    // Call service to get filtered notes
    const result = noteService.getAllNotes(query);

    // Return result with HTTP 200 (OK)
    res.status(200).json(result);
  } catch (error) {
    // Pass any error to centralized error handler
    next(error);
  }
};


export const getNoteById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Convert ID from string to number
    const id = Number(req.params.id);

 
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

    // Ask service for note
    const note = noteService.getNoteById(id);


    if (!note) {
      return res.status(404).json({
        error: `Note with ID ${id} not found`,
        status: 404,
      });
    }

    // Return note
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};


export const createNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // req.body contains JSON sent by client
    const noteData: CreateNoteDto = req.body;

    // Create note via service
    const newNote = noteService.createNote(noteData);

    // Return created note with HTTP 201 (Created)
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Convert ID from URL to number
    const id = Number(req.params.id);

    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

    // Data to update comes from request body
    const updateData: UpdateNoteDto = req.body;

    // Ask service to update note
    const updatedNote = noteService.updateNote(id, updateData);

    
    if (!updatedNote) {
      return res.status(404).json({
        error: `Note with ID ${id} not found`,
        status: 404,
      });
    }

    // Return updated note
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};


export const deleteNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Convert ID to number
    const id = Number(req.params.id);

    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

    // Ask service to delete note
    const deletedNote = noteService.deleteNote(id);

   
    if (!deletedNote) {
      return res.status(404).json({
        error: `Note with ID ${id} not found`,
        status: 404,
      });
    }

    
    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    next(error);
  }
};