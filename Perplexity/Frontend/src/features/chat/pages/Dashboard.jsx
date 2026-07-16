import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Sidebar from "../components/sidebar/Sidebar";
import UserMessage from "../components/chat/UserMessage";
import AiMessage from "../components/chat/AiMessage";
import ChatInput from "../components/chat/ChatInput";
import { useAuth } from "../../auth/hooks/useAuth";

const Dashboard = () => {
  const chatActions = useChat();
  const dispatch = useDispatch();
const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const {
    chats,
    messages,
    currentChatId,
    isLoading,
  } = useSelector((state) => state.chat);

  const auth = useAuth()

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    chatActions.initializeSocketConnection();
    chatActions.handleGetChat();
  }, []);

  const activeChat = useMemo(() => {
    return chats.find((chat) => chat._id === currentChatId);
  }, [chats, currentChatId]);

  const handleChatSelect = async (chatId) => {
    if (!chatId) return;

    await chatActions.handleGetMessages({
      chat: chatId,
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const result = await chatActions.handleSendMessage({
      message: inputValue,
      chat: currentChatId,
    });

    if (result?.success === false) return;

    setInputValue("");
  };

  const handleDelete = async (chatId) => {
    await chatActions.handleDeleteChat({
        chat: chatId,
    });
};

const handleLogout = async () => {
    const res = await auth.handleLogout();

    if (res.success) {
        navigate("/login");
    }
};

  return (
    <main className="h-screen bg-[#1b1b1b] p-4">
      <div className="h-full flex gap-5">

      <Sidebar
  chats={chats}
  currentChatId={currentChatId}
  onSelectChat={handleChatSelect}
  onDeleteChat={handleDelete}
  onLogout={handleLogout}
/>
        <section className="flex-1 flex flex-col rounded-3xl bg-[#171717]">

         

          <div className="flex-1 max-w-[80%] mx-auto scrollbar-none overflow-y-auto px-8 py-6">

            {messages.length === 0 ? (

              <div className="h-full flex justify-center items-center text-neutral-500">
                Start a conversation...
              </div>

            ) : (

              <div className="space-y-6">

                {messages.map((message) =>

                  message.role === "user" ? (

                    <UserMessage
                      key={message._id}
                      content={message.content}
                    />

                  ) : (

                    <AiMessage
                      key={message._id}
                      content={message.content}
                    />

                  )

                )}

              </div>

            )}

          </div>

          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={handleSend}
            disabled={isLoading}
          />

        </section>

      </div>
    </main>
  );
};

export default Dashboard;