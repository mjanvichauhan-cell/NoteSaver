import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const NotesContext = createContext(null);

function createNote() {
  const now = new Date().toISOString();
  return {
    id: Date.now(),
    title: "",
    content: "",
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    pinned: false,
    deleted: false,
  };
}

export function NotesProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const addNote = useCallback(() => {
    const note = createNote();
    setNotes((previous) => [note, ...previous]);
    return note;
  }, [setNotes]);

  const updateNote = useCallback(
    (updatedNote) => {
      setNotes((previous) =>
        previous.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id) => {
      const deletedAt = new Date().toISOString();
      setNotes((previous) =>
        previous.map((note) =>
          note.id === id
            ? {
                ...note,
                deleted: true,
                deletedAt,
                updatedAt: deletedAt,
              }
            : note
        )
      );
    },
    [setNotes]
  );

  const restoreNote = useCallback(
    (id) => {
      const updatedAt = new Date().toISOString();
      setNotes((previous) =>
        previous.map((note) =>
          note.id === id
            ? {
                ...note,
                deleted: false,
                deletedAt: null,
                updatedAt,
              }
            : note
        )
      );
    },
    [setNotes]
  );

  const permanentlyDeleteNote = useCallback(
    (id) => {
      setNotes((previous) => previous.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  const togglePin = useCallback(
    (id) => {
      setNotes((previous) =>
        previous.map((note) =>
          note.id === id
            ? {
                ...note,
                pinned: !note.pinned,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
    },
    [setNotes]
  );

  const value = useMemo(
    () => ({
      notes,
      setNotes,
      addNote,
      updateNote,
      deleteNote,
      restoreNote,
      permanentlyDeleteNote,
      togglePin,
    }),
    [
      notes,
      setNotes,
      addNote,
      updateNote,
      deleteNote,
      restoreNote,
      permanentlyDeleteNote,
      togglePin,
    ]
  );

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error(
      "useNotesContext must be used inside NotesProvider"
    );
  }
  return context;
}