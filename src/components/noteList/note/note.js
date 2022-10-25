import "./note.css";

export const Note = ({ id, title, description }) => {
  const onEdit = () => {
    Main.openNewNoteWindow({ title, description, id });
  };

  return (
    <div className="note">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};
