import { Note } from "../models/noteModel";


class NoteStore {
  private notes: Note[] = [];
  private currentId = 1;


  getAll(): Note[] {
    return this.notes;
  }


  getById(id: number): Note | undefined {
    for (const note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
    return undefined;
  }


  add(noteData: Omit<Note, "id">): Note {
    const newNote: Note = {
      ...noteData,
      id: this.currentId,
    };

    this.currentId += 1;
    this.notes.push(newNote);

    return newNote;
  }


  update(id: number, updates: Partial<Note>): Note | null {
    const note = this.getById(id);

    // If note does not exist
    if (!note) {
      return null;
    }

    // Update fields
    if (updates.title !== undefined) note.title = updates.title;
    if (updates.content !== undefined) note.content = updates.content;
    if (updates.tags !== undefined) note.tags = updates.tags;
    if (updates.priority !== undefined) note.priority = updates.priority;
    if (updates.status !== undefined) note.status = updates.status;

    note.updatedAt = new Date().toISOString();

    return note;
  }

  /**
   * Delete a note by ID
   */
  delete(id: number): Note | null {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        const deletedNote = this.notes[i];
        this.notes.splice(i, 1);
        return deletedNote;
      }
    }
    return null;
  }

  /**
   * Number of notes (useful for pagination)
   */
  count(): number {
    return this.notes.length;
  }

  /**
   * Remove all notes (used in testing)
   */
  clear(): void {
    this.notes = [];
    this.currentId = 1;
  }
}

// Export ONE shared instance
export default new NoteStore();
