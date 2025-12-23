import { Request, Response, NextFunction } from 'express';

const VALID_STATUSES = ['active', 'done', 'archived'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

export const validateCreateNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, status, priority } = req.body;

  // Required fields
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required', status: 400 });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required', status: 400 });
  }

  // Validation
  if (title.length > 200) {
    return res.status(400).json({
      error: 'Title must be 200 characters or less',
      status: 400,
    });
  }

  if (content.length > 10000) {
    return res.status(400).json({
      error: 'Content must be 10000 characters or less',
      status: 400,
    });
  }

  // Enum validation
  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: "Status must be 'active', 'done', or 'archived'",
      status: 400,
    });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error: "Priority must be 'low', 'medium', or 'high'",
      status: 400,
    });
  }

  next();
};

export const validateUpdateNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, status, priority, tags } = req.body;

  // Must provide at least one field
  if (!title && !content && !status && !priority && !tags) {
    return res.status(400).json({
      error: 'At least one field must be provided for update',
      status: 400,
    });
  }

  if (title && title.length > 200) {
    return res.status(400).json({
      error: 'Title must be 200 characters or less',
      status: 400,
    });
  }

  if (content && content.length > 10000) {
    return res.status(400).json({
      error: 'Content must be 10000 characters or less',
      status: 400,
    });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: "Status must be 'active', 'done', or 'archived'",
      status: 400,
    });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error: "Priority must be 'low', 'medium', or 'high'",
      status: 400,
    });
  }

  next();
};
