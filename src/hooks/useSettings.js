import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const defaultSettings = {
  theme: "system",
  autoSave: true,
  confirmDelete: true,
  confirmRestore: true,
  markdownEditor: true,
};

function useSettings() {
  const [settings, setSettings] = useLocalStorage(
    "noteSettings",
    defaultSettings
  );

  const updateSetting = useCallback((key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }, [setSettings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else if (settings.theme === "light") {
      root.classList.remove("dark");
    } else {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", isDark);
    }
  }, [settings.theme]);

  return {
    settings: {
      ...defaultSettings,
      ...settings,
    },
    setSettings,
    updateSetting,
  };
}

export default useSettings;