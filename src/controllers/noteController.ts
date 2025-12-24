import { Request, Response, NextFunction } from 'express';
import noteService from '../services/noteService';
import { CreateNoteDto, UpdateNoteDto, NoteQuery } from '../models/noteModel';

//TO check error handling
//throw new Error('Test error');



export const getAllNotes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as NoteQuery;

    // Call service to get filtered notes
    const result = noteService.getAllNotes(query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const getNoteById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

 
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

    const note = noteService.getNoteById(id);

    if (!note) {
      return res.status(404).json({
        error: `Note with ID ${id} not found`,
        status: 404,
      });
    }
    
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

    const newNote = noteService.createNote(noteData);
    
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
    const id = Number(req.params.id);

    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

    const updateData: UpdateNoteDto = req.body;

    const updatedNote = noteService.updateNote(id, updateData);

    
    if (!updatedNote) {
      return res.status(404).json({
        error: `Note with ID ${id} not found`,
        status: 404,
      });
    }

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
    const id = Number(req.params.id);

    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
        status: 400,
      });
    }

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