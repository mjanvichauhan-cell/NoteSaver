import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NotePreview({ title, content }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
      <article className="prose max-w-none dark:prose-invert">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          {title || "Untitled Note"}
        </h1>

        {content?.trim() ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
            {content}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-400">This note is empty.</p>
        )}
      </article>
    </div>
  );
}

export default NotePreview;