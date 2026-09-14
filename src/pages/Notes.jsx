import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../components/layout/MainLayout";
import NoteEditor from "../components/Notes/NoteEditor";
import ConfirmModal from "../components/common/ConfirmModal";
import { useNotesContext } from "../context/NotesContext";
import useSettings from "../hooks/useSettings";

const NOTES_PER_PAGE = 5;

function Notes() {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
  } = useNotesContext();

  const { settings } = useSettings();
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const activeNotes = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return notes
      .filter((note) => !note.deleted)
      .filter((note) => {
        if (!search) return true;
        return (
          note.title?.toLowerCase().includes(search) ||
          note.content?.toLowerCase().includes(search)
        );
      })
      .filter((note) => {
        if (filter === "pinned") return note.pinned;
        return true;
      })
      .sort((a, b) => {
        if (filter !== "recent") {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
        }
        return (
          new Date(b.updatedAt || 0) -
          new Date(a.updatedAt || 0)
        );
      });
  }, [notes, searchTerm, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(activeNotes.length / NOTES_PER_PAGE)
  );

  const paginatedNotes = useMemo(() => {
    const start = (currentPage - 1) * NOTES_PER_PAGE;
    return activeNotes.slice(
      start,
      start + NOTES_PER_PAGE
    );
  }, [activeNotes, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAddNote = () => {
    const note = addNote();
    setSelectedNote(note);
    setSearchTerm("");
    setFilter("all");
    setCurrentPage(1);
    toast.success("New note created");
  };

  const handleUpdate = (updatedNote) => {
    updateNote(updatedNote);
    setSelectedNote((current) =>
      current?.id === updatedNote.id
        ? updatedNote
        : current
    );
  };

  const requestDelete = (note) => {
    if (settings.confirmDelete) {
      setNoteToDelete(note);
      return;
    }
    deleteNote(note.id);
    if (selectedNote?.id === note.id) {
      setSelectedNote(null);
    }
    toast.success("Note moved to Recently Deleted");
  };

  const confirmDelete = () => {
    if (!noteToDelete) return;
    deleteNote(noteToDelete.id);
    if (selectedNote?.id === noteToDelete.id) {
      setSelectedNote(null);
    }
    setNoteToDelete(null);
    toast.success("Note moved to Recently Deleted");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <>
      <MainLayout
        notes={paginatedNotes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onAddNote={handleAddNote}
        onDeleteNote={requestDelete}
        onTogglePin={togglePin}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        filter={filter}
        onFilterChange={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <NoteEditor
          note={selectedNote}
          onUpdate={handleUpdate}
          onClose={() => setSelectedNote(null)}
        />
      </MainLayout>

      <ConfirmModal
        isOpen={Boolean(noteToDelete)}
        title="Delete note?"
        message={
          noteToDelete
            ? `"${noteToDelete.title || "Untitled Note"}" will be moved to Recently Deleted.`
            : ""
        }
        confirmText="Move to Trash"
        onConfirm={confirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />
    </>
  );
}

export default Notes;