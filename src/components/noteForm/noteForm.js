import { useState } from "react";

export function NoteForm() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  Main.on("load-note", ({ id, title, description }) => {
    setId(id);
    setTitle(title);
    setDescription(description);
  });

  const onTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const onDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Main.onNoteSave({ id, title, description });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" onChange={onTitleChange} value={title} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={onDescriptionChange}
          value={description}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
