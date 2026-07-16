import { Trash2 } from "lucide-react";

const ChatTitleList = ({
  chats = [],
  currentChatId,
  onSelectChat,
  onDeleteChat,
}) => {
  if (!chats.length) {
    return (
      <div className="rounded-2xl border border-neutral-700 bg-[#171717] p-4 text-center text-sm text-neutral-400">
        No chats yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`group flex items-center justify-between rounded-xl transition ${
            currentChatId === chat._id
              ? "border border-indigo-500 bg-indigo-500/10"
              : "hover:bg-neutral-800"
          }`}
        >
          <button
            onClick={() => onSelectChat(chat._id)}
            className="flex-1 p-4 text-left"
          >
            <h3 className="truncate text-sm font-medium text-white">
              {chat.title || "Untitled Chat"}
            </h3>

            <p className="mt-1 text-xs text-neutral-500">
              {chat.updatedAt
                ? new Date(chat.updatedAt).toLocaleDateString()
                : ""}
            </p>
          </button>

          <button
            onClick={() => onDeleteChat(chat._id)}
            className="mr-3 hidden rounded-lg p-2 text-neutral-400 transition hover:bg-red-500 hover:text-white group-hover:block"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatTitleList;