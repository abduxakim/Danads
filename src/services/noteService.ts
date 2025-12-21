import {
  Note,
  CreateNoteDto,
  UpdateNoteDto,
  NoteQuery,
} from "../models/noteModel";
import noteStore from "../data/noteStore";


class NoteService {
  /**
   * Create a new note
   */
  createNote(data: CreateNoteDto): Note {
    const now = new Date().toISOString();

    const newNote = noteStore.add({
      title: data.title,
      content: data.content,
      tags: data.tags ?? [],
      priority: data.priority ?? "medium", 
      status: data.status ?? "active",     
      createdAt: now,
      updatedAt: now,
    });

    return newNote;
  }


  getAllNotes(query: NoteQuery): {
    data: Note[];
    page: number;
    limit: number;
    total: number;
  } {
    let notes = noteStore.getAll();

    // 🔍 Search by title or content
    if (query.search) {
      const searchText = query.search.toLowerCase();
      notes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText) ||
          note.content.toLowerCase().includes(searchText)
      );
    }

    // 🎯 Filter by status
    if (query.status) {
      notes = notes.filter((note) => note.status === query.status);
    }

    // 🎯 Filter by priority
    if (query.priority) {
      notes = notes.filter((note) => note.priority === query.priority);
    }

    // 🏷 Filter by tags
    if (query.tags) {
      const tags = query.tags.split(",").map((tag) => tag.trim());
      notes = notes.filter((note) =>
        tags.some((tag) => note.tags?.includes(tag))
      );
    }

    // 📄 Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: notes.slice(start, end),
      page,
      limit,
      total: notes.length,
    };
  }


  getNoteById(id: number): Note | undefined {
    return noteStore.getById(id);
  }


  updateNote(id: number, data: UpdateNoteDto): Note | null {
    return noteStore.update(id, data);
  }


  deleteNote(id: number): Note | null {
    return noteStore.delete(id);
  }
}

export default new NoteService();
