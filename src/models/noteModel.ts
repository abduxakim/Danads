export type NotePriority = 'low' | 'medium' | 'high';
export type NoteStatus = 'active' | 'done' | 'archived';

export interface Note {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  priority: NotePriority;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}
//POST /notes
export interface CreateNoteDto {
  title: string;
  content: string;
  tags?: string[];
  priority?: NotePriority; 
  status?: NoteStatus;     
}
//PUT /notes/:id 
export interface UpdateNoteDto {
  title?: string;
  content?: string;
  tags?: string[];
  priority?: NotePriority;
  status?: NoteStatus;
}

//GET /notes query parameters
export interface NoteQuery {
  search?: string;
  tags?: string; 
  priority?: NotePriority;
  status?: NoteStatus;
  page?: string;
  limit?: string;
}
