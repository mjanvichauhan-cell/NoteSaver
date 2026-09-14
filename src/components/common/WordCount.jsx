function WordCount({ text = "" }) {
  const cleanText = text.trim();
  const wordCount = cleanText
    ? cleanText.split(/\s+/).length
    : 0;
  const characterCount = text.length;

  return (
    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
      <span> {wordCount} {wordCount === 1 ? "word" : "words"} </span>
      <span aria-hidden="true">•</span>

      <span> {characterCount}{" "} {characterCount === 1 ? "character" : "characters"} </span>
    </div>
  );
}

export default WordCount;