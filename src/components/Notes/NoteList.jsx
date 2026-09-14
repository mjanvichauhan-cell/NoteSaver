import NoteCard from "./NoteCard";

function NoteList({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onTogglePin,
}) {
  return (
    <div className="space-y-1">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} selected={selectedNote?.id === note.id} onSelect={onSelectNote} onDelete={onDeleteNote} onTogglePin={onTogglePin}  />
      ))}
    </div>
  );
}

export default NoteList;