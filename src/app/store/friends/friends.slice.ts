import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriends } from '../../../types/models';

const initialState: IFriends = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<any>) => {
      state.friends = action.payload;
    },
    setPendingFriendsInvitations: (state, action: PayloadAction<any>) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setOnlineUsers: (state, action: PayloadAction<any>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const friendsActions = friendsSlice.actions;
export const friendsReducer = friendsSlice.reducer;
