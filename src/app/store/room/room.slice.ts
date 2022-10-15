import { createSlice } from '@reduxjs/toolkit';
import {} from '../../../types/models';

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: localStorage.getItem('audioOnly') === 'true',
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};
export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setOpenRoom: (state, action) => {
      state.isUserInRoom = action.payload.isUserInRoom;
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
    },
    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    setActiveRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStreams: (state, action) => {
      state.remoteStreams = action.payload;
    },
    setAudioOnly: (state, action) => {
      localStorage.setItem('audioOnly', action.payload);
      state.audioOnly = action.payload;
    },
    setScreenSharingStream: (state, action) => {
      state.screenSharingStream = action.payload.stream || null;
      state.isScreenSharingActive = !!action.payload.stream;
    },
    setUserJoinedWithOnlyAudio: (state, action) => {
      state.isUserJoinedWithOnlyAudio = action.payload;
    },
  },
});

export const roomActions = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
