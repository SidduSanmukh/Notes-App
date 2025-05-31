// src/EditNote.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For URL parameters and navigation
import { getNotes } from "./db"; // Import the function to get notes from the database

function EditNote() {
  const { id } = useParams(); // Get the note id from the URL
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    text: "",
    priority: "Low",
    dueDate: "",
  });

  useEffect(() => {
    // Fetch the note from localStorage based on the id
    const notes = getNotes();
    const currentNote = notes.find((note) => note.id === id);
    if (currentNote) {
      setNote(currentNote); // Set the note state to the one being edited
    } else {
      navigate("/notes"); // If no note is found, redirect to the notes list
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateNote = () => {
    if (!note.title || !note.text || !note.dueDate) return;

    // Get the existing notes from localStorage
    const notes = getNotes();
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, ...note } : n
    );

    // Update the notes in localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Alert the user and redirect back to the notes list
    alert("Note updated!");
    navigate("/notes");
  };

  return (
    <div className="edit-note-container">
      <h2>Edit Note</h2>
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Note Title"
        required
      />
      <textarea
        name="text"
        value={note.text}
        onChange={handleChange}
        placeholder="Write your note"
        required
      />
      <select
        name="priority"
        value={note.priority}
        onChange={handleChange}
        required
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={note.dueDate}
        onChange={handleChange}
        required
      />
      <button onClick={handleUpdateNote}>Update Note</button>
    </div>
  );
}

export default EditNote;
