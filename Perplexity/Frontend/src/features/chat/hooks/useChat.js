import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChat,
  getMessages,
  deleteChat,
} from "../service/chat.api";

import { useDispatch } from "react-redux";

import {
  setIsLoading,
  setChats,
  setMessages,
  setCurrentChatId,
  setError,
} from "../redux/chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chat: chatId }) {
    try {
      dispatch(setIsLoading(true));

      const data = await sendMessage({
        message,
        chat: chatId,
      });

      // If backend created a new chat
      if (data.chat?._id) {
        dispatch(setCurrentChatId(data.chat._id));
      }

      // Refresh sidebar
      await handleGetChat();

      // Refresh current messages
      await handleGetMessages({
        chat: data.chat?._id || chatId,
      });

      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Unable to send message"
        )
      );

      return {
        success: false,
        error,
      };
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetChat() {
    try {
      dispatch(setIsLoading(true));

      const data = await getChat();

      dispatch(setChats(data.chats));

      return data.chats;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Unable to fetch chats"
        )
      );

      return [];
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetMessages({ chat: chatId }) {
    try {
      dispatch(setIsLoading(true));

      const data = await getMessages({
        chat: chatId,
      });

      dispatch(setMessages(data.messages));

      dispatch(setCurrentChatId(chatId));

      return data.messages;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Unable to fetch messages"
        )
      );

      return [];
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleDeleteChat({ chat: chatId }) {
    try {
      dispatch(setIsLoading(true));

      const data = await deleteChat({
        chat: chatId,
      });

      dispatch(setCurrentChatId(null));

      dispatch(setMessages([]));

      await handleGetChat();

      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Unable to delete chat"
        )
      );

      return {
        success: false,
        error,
      };
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChat,
    handleGetMessages,
    handleDeleteChat,
  };
};