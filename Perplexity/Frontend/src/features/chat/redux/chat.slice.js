import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  messages: [],
  currentChatId: null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  clearMessages,
  setCurrentChatId,
  setIsLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;