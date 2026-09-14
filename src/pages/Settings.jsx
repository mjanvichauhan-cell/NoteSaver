import { Check, Moon, Monitor, Sun, X} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToggleSwitch from "../components/common/ToggleSwitch";
import useSettings from "../hooks/useSettings";

function SettingsRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <ToggleSwitch checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function ThemeButton({
  icon: Icon,
  title,
  active,
  onClick,
}) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-xl border p-4 transition ${
        active
          ? "border-black bg-gray-100 dark:border-white dark:bg-gray-800"
          : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      }`}
    >
      <Icon className="mx-auto mb-2" size={21} />
      <span className="text-sm">{title}</span>

      {active && (
        <Check  size={15}  className="mx-auto mt-2"/>
      )}
    </button>
  );
}

function Settings() {
  const navigate = useNavigate();
  const { settings, updateSetting } = useSettings();
  const changeTheme = (theme) => {
    updateSetting("theme", theme);
    toast.success(`Theme changed to ${theme}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <header className="flex h-18.5 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
        <div>
          <h1 className="text-xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your NoteSaver
          </p>
        </div>

        <button  type="button"  onClick={() => navigate("/")}  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" title="Close settings" >
          <X size={20} />
        </button>
      </header>

      <main className="mx-auto w-full max-w-4xl p-6">
        <section className="mb-6 rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
          <h2 className="mb-4 text-lg font-semibold">
            Appearance
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <ThemeButton  icon={Sun}  title="Light"  active={settings.theme === "light"}  onClick={() => changeTheme("light")} />
            <ThemeButton icon={Moon} title="Dark" active={settings.theme === "dark"} onClick={() => changeTheme("dark")}  />
            <ThemeButton  icon={Monitor} title="System" active={settings.theme === "system"} onClick={() => changeTheme("system")}/>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
          <h2 className="mb-5 text-lg font-semibold"> Notes</h2>

          <div className="space-y-6">
            <SettingsRow title="Ask before deleting" description="Show confirmation before moving a note to Recently Deleted." checked={settings.confirmDelete}
              onChange={(value) =>
                updateSetting("confirmDelete", value)
              }
            />
            <SettingsRow title="Ask before restoring" description="Show confirmation before restoring a deleted note." checked={settings.confirmRestore}
              onChange={(value) =>
                updateSetting("confirmRestore", value)
              }
            />
            <SettingsRow title="Auto-save" description="Save changes automatically while you type." checked={settings.autoSave}
              onChange={(value) =>
                updateSetting("autoSave", value)
              }
            />
            <SettingsRow title="Markdown preview" description="Enable the Preview button for formatted notes." checked={settings.markdownEditor}
              onChange={(value) =>
                updateSetting("markdownEditor", value)
              }
            />
          </div>
        </section>

        
        <section className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
          <h2 className="mb-2 text-lg font-semibold">
            About NoteSaver
          </h2>

          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            NoteSaver is a simple note-taking application for
            creating, editing, searching, organizing and managing
            your notes.
          </p>

          <p className="mt-3 text-xs text-gray-400">
            NoteSaver • v1.0.0
          </p>
        </section>
      </main>
    </div>
  );
}
export default Settings;