import { useState } from "react";
import { NoteList } from "../components/noteList/noteList";

export function MainWindow() {
  const [notes, setNotes] = useState([]);
  Main.on("notes-update", (notes) => {
    setNotes(notes);
  });

  return (
    <>
      <div className="app">
        <button onClick={() => Main.openNewNoteWindow()}>
          Create new note
        </button>
        <NoteList notes={notes} />
      </div>
    </>
  );
}
