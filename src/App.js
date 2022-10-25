import { MainWindow } from "./windows/mainWindow";
import { NoteWindow } from "./windows/noteWindow";

const isNewNote = () => {
  const newNoteIdentifier = document.getElementById("new-task");
  return newNoteIdentifier !== null;
};

export function App() {
  if (!isNewNote()) {
    return <MainWindow />;
  }

  return <NoteWindow />;
}
