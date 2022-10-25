import { Note } from "./note/note";
import "./noteList.css";

export const NoteList = ({ notes }) => {
  return (
    <ul className="note-list">
      {notes.map((note, index) => (
        <li key={index}>
          <Note {...note} />
        </li>
      ))}
    </ul>
  );
};
