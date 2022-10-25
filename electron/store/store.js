import create from "zustand/vanilla";
import { v4 as uuidv4 } from "uuid";

const electron = require("electron");
const path = require("path");
const fs = require("fs");

const STORE_FILE_NAME = "store.json";

const parseDataFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.error(error);
    return {};
  }
};

const store = create((set) => ({
  notes: [],
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

const saveOnFile = () => {
  fs.writeFileSync(storePath, JSON.stringify(getState()));
};

export const saveNote = ({ id, title, description }) => {
  const { notes } = getState();
  if (id) {
    for (let note of notes) {
      if (note.id === id) {
        note.title = title;
        note.description = description;
        break;
      }
    }
    setState({ notes });
    saveOnFile();
    return;
  }

  setState({ notes: [...notes, { id: uuidv4(), title, description }] });
  saveOnFile();
};

const { getState, setState } = store;

const userDataPath = electron.app.getPath("userData");

const storePath = path.join(userDataPath, STORE_FILE_NAME);

const data = parseDataFile(storePath);

setState(data);

export default store;
