import { Send } from "lucide-react";
import { useRef } from "react";

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!disabled && value.trim()) {
        onSend(e);
      }
    }
  };

  return (
    <form onSubmit={onSend} className="px-5 pb-5">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border border-neutral-700 bg-[#202020] p-4">

        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask anything..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="max-h-40 flex-1 resize-none overflow-y-auto bg-transparent text-white outline-none placeholder:text-neutral-500"
        />

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} className="text-black" />
        </button>

      </div>
    </form>
  );
};

export default ChatInput;