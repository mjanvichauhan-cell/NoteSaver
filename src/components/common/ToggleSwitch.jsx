function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked
          ? "bg-black dark:bg-white"
          : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6 dark:bg-black" : "left-1"
        }`}
      />
    </button>
  );
}

export default ToggleSwitch;