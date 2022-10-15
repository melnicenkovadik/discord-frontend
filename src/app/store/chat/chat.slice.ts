import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatTypes, IChatState } from '../../../types/models';

const initialState: IChatState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

interface IChosenChatDetails {
  id: string;
  name: string;
  mail: string;
  chatType: ChatTypes;
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChosenChatDetails: (state, action: PayloadAction<IChosenChatDetails>) => {
      state.chatType = action.payload.chatType;
      state.chosenChatDetails = {
        id: action.payload.id,
        mail: action.payload.mail,
        name: action.payload.name,
      };
    },
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
