import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const AiMessage = ({ content }) => {
  return (
    <div className="flex justify-start ">
      <div className="max-w-4xl">

        <div className="prose prose-invert max-w-none text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>

      </div>
    </div>
  );
};

export default AiMessage;