A simple and well-structured RESTful Notes Management API built with Node.js, Express, and TypeScript.
This project demonstrates core backend development concepts such as CRUD operations, request validation, error handling, and clean architecture.

🚀 Project Overview

The Notes Management API allows users to:

Create notes

Read notes (single or list)

Update notes

Delete notes

The API also supports search, filtering, and pagination, making it closer to a real-world backend service.

Note:
Data persistence is handled in-memory (no database), as required by the task specification.

🛠 Tech Stack

Node.js

Express

TypeScript

ts-node-dev (development)

Postman (API testing)

📁 Project Structure
src/
├── controllers/     # Handle HTTP requests and responses
├── data/            # In-memory data store
├── middleware/      # Validation and error handling
├── models/          # TypeScript interfaces and types
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Helper utilities (if needed)
├── app.ts           # Express app configuration
└── server.ts        # Server startup


This structure follows separation of concerns, making the code easy to read, test, and scale.

📌 Data Model
Note
Field	Type	Description
id	number	Unique note identifier
title	string	Note title
content	string	Note content
tags	string[] (optional)	Categories or labels
priority	low | medium | high	Note importance level
status	active | done | archived	Note state
createdAt	string (ISO)	Creation timestamp
updatedAt	string (ISO)	Last update timestamp
📡 API Endpoints
➤ Create a note

POST /notes

{
  "title": "Meeting Notes",
  "content": "Discuss project requirements",
  "tags": ["work"],
  "priority": "medium"
}

➤ Get all notes

GET /notes

Query Parameters (optional):

search – search in title or content

tags – filter by tags

priority – filter by priority

status – filter by status

page – pagination page

limit – items per page

Example:

/notes?status=active&priority=high&page=1&limit=10

➤ Get note by ID

GET /notes/:id

➤ Update a note

PUT /notes/:id

{
  "status": "done",
  "priority": "high"
}

➤ Delete a note

DELETE /notes/:id

⚠️ Error Handling

The API uses centralized error handling.

Example error response:

{
  "error": "Note not found",
  "status": 404
}

Common Status Codes
Code	Meaning
200	Success
201	Created
400	Bad Request
404	Not Found
500	Internal Server Error
▶️ How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev

3️⃣ API will be available at
http://localhost:3000/notes


Health check:

http://localhost:3000/health

