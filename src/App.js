// src/App.js

import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route for navigation
import Navbar from "./Navbar"; // Import Navbar
import NotesList from "./NotesList"; // Import NotesList to show all notes
import EditNote from "./EditNote"; // Import EditNote to edit an existing note
import { addNote } from "./db"; // Function to add a new note to the database

function App() {
  const [note, setNote] = useState({
    title: "",
    text: "",
    priority: "Low",
    dueDate: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save the new or edited note
  const handleSaveNote = async () => {
    if (!note.title || !note.text || !note.dueDate) return; // Validate required fields

    const newNote = {
      ...note,
      id: new Date().toISOString(), // Assign a unique id using current time
      createdAt: new Date(), // Add creation time
    };

    await addNote(newNote); // Save the note

    setNote({
      title: "",
      text: "",
      priority: "Low",
      dueDate: "",
    }); // Reset the form fields
    alert("Note created");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        {/* Home Route (Write Note Form) */}
        <Route
          path="/"
          element={
            <div className="main-container">
              <div className="form-container">
                <h2>Write Notes</h2>
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
                  style={{ width: "98%" }}
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
                <button onClick={handleSaveNote}>Add Note</button>
              </div>
            </div>
          }
        />
        {/* Notes List Route (List of all notes) */}
        <Route path="/notes" element={<NotesList isDarkMode={isDarkMode} />} />
        {/* Edit Note Route */}
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </div>
  );
}

export default App;
