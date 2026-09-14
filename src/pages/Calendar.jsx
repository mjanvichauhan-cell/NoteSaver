import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Clock, FileText } from "lucide-react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/NotesContext";
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
  const navigate = useNavigate();
  const { notes } = useNotesContext();
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const activeNotes = useMemo(
    () => notes.filter((note) => !note.deleted),
    [notes]
  );

  const notesForSelectedDate = useMemo(() => {
    return activeNotes.filter((note) => {
      if (!note.createdAt) return false;
      const noteDate = new Date(note.createdAt);
      return (
        noteDate.getFullYear() === selectedDate.getFullYear() &&
        noteDate.getMonth() === selectedDate.getMonth() &&
        noteDate.getDate() === selectedDate.getDate()
      );
    });
  }, [activeNotes, selectedDate]);

  const hasNoteOnDate = (date) => {
    return activeNotes.some((note) => {
      if (!note.createdAt) return false;
      const noteDate = new Date(note.createdAt);
      return (
        noteDate.getFullYear() === date.getFullYear() &&
        noteDate.getMonth() === date.getMonth() &&
        noteDate.getDate() === date.getDate()
      );
    });
  };

  const formattedDate = selectedDate.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-20 flex h-18.5 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
            <CalendarDays size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              Calendar
            </h1>
            <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              View your notes by date
            </p>
          </div>
        </div>

        <button  type="button"  onClick={() => navigate("/")}  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" >
          <ArrowLeft size={17} />
          <span className="hidden sm:inline">
            Back to Notes
          </span>
        </button>
      </header>

      <main className="mx-auto w-full max-w-6xl p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Notes Calendar
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select a date to see notes created on that day.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-5">
              <h3 className="font-semibold">
                Select Date
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Dates with notes are marked.
              </p>
            </div>

            <div className="flex justify-center overflow-hidden">
              <DatePicker selected={selectedDate}
                onChange={(date) =>
                  date && setSelectedDate(date)
                }
                inline
                dayClassName={(date) =>
                  hasNoteOnDate(date)
                    ? "note-day"
                    : undefined
                }
              />
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <span className="h-2 w-2 rounded-full bg-gray-900 dark:bg-white" />
              Notes available
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 p-5 dark:border-gray-800">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Selected date
              </p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">
                  {formattedDate}
                </h3>
                <div className="rounded-xl bg-gray-100 px-3 py-2 text-center dark:bg-gray-800">
                  <p className="text-lg font-bold">
                    {notesForSelectedDate.length}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {notesForSelectedDate.length === 1
                      ? "Note"
                      : "Notes"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {notesForSelectedDate.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center dark:border-gray-700 dark:bg-gray-950">
                  <FileText size={32} className="mb-4 text-gray-400" />
                  <h4 className="font-semibold">
                    No notes for this day
                  </h4>
                  <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                    You haven't created a note on this date.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notesForSelectedDate.map((note) => (
                    <article key={note.id} className="rounded-xl border border-gray-200 p-4 hover:shadow-sm dark:border-gray-700"   >
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                          <FileText size={17} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-semibold">
                            {note.title || "Untitled Note"}
                          </h4>
                          <p className="mt-1 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                            {note.content || "No content"}
                          </p>
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock size={13} />
                            {new Date(
                              note.createdAt
                            ).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Calendar;