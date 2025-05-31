// // src/NoteApp.js
// import React, { useEffect, useState } from "react";
// import { addNote, getNotes, deleteNote } from "./db";

// function NoteApp() {
//   const [notes, setNotes] = useState([]);
//   const [noteText, setNoteText] = useState("");

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const allNotes = await getNotes();
//       setNotes(allNotes);
//     };
//     fetchNotes();
//   }, []);

//   const handleAddNote = async () => {
//     const newNote = { text: noteText, createdAt: new Date() };
//     await addNote(newNote);
//     setNoteText("");
//     const allNotes = await getNotes();
//     setNotes(allNotes);
//   };

//   const handleDeleteNote = async (id) => {
//     await deleteNote(id);
//     const allNotes = await getNotes();
//     setNotes(allNotes);
//   };

//   return (
//     <div>
//       <h1>Note Taking App</h1>
//       <input
//         type="text"
//         value={noteText}
//         onChange={(e) => setNoteText(e.target.value)}
//         placeholder="Write a new note"
//       />
//       <button onClick={handleAddNote}>Add Note</button>
//       <ul>
//         {notes.map((note) => (
//           <li key={note.id}>
//             {note.text}
//             <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default NoteApp;
