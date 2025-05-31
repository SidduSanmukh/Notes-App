// db.js

// Get all notes from localStorage
export const getNotes = () => {
  try {
    // Attempt to parse the 'notes' stored in localStorage, or return an empty array if not found
    return JSON.parse(localStorage.getItem("notes")) || [];
  } catch (error) {
    // In case of an error (e.g., invalid JSON format), log the error and return an empty array
    console.error("Error fetching notes:", error);
    return []; // Return an empty array in case of error
  }
};

// Add a new note to localStorage
export const addNote = (newNote) => {
  const notes = getNotes(); // Get current notes from localStorage
  notes.push(newNote); // Add the new note to the array
  localStorage.setItem("notes", JSON.stringify(notes)); // Save the updated notes array back to localStorage
};

// Delete a note by its ID
export const deleteNote = (id) => {
  const notes = getNotes(); // Get current notes from localStorage
  const updatedNotes = notes.filter((note) => note.id !== id); // Filter out the note with the matching ID
  localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save the updated notes array back to localStorage
};

// Update an existing note by its ID
export const updateNote = (updatedNote) => {
  const notes = getNotes(); // Get current notes from localStorage
  const updatedNotes = notes.map(
    (note) => (note.id === updatedNote.id ? updatedNote : note) // Replace the note with the updated note if IDs match
  );
  localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save the updated notes array back to localStorage
};
