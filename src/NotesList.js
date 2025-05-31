// src/NotesList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { getNotes, deleteNote } from "./db"; // Ensure the deleteNote function is imported

function NotesList({ isDarkMode }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes || []); // Ensure it's an empty array if no notes found
    };

    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    deleteNote(id); // Delete note from localStorage
    setNotes(getNotes()); // Re-fetch the notes to reflect the deletion
  };

  if (!notes || notes.length === 0) {
    return <div>No notes available. Add a new note!</div>;
  }

  return (
    <div className={`notes-list-container ${isDarkMode ? "dark" : ""}`}>
      <h2>Notes List</h2>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className="note-card">
            <div className="note-header">
              <h3>{note.title}</h3>
              <span className={`priority ${note.priority.toLowerCase()}`}>
                {note.priority}
              </span>
            </div>
            <p style={{ overflow: "hidden" }}>{note.text}</p>
            <p>Due: {note.dueDate}</p>
            <div className="note-actions">
              <Link to={`/edit/${note.id}`}>
                <button>Edit</button>
              </Link>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
