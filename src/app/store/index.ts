import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authReducer } from './auth/auth.slice';
import { friendsReducer } from './friends/friends.slice';
import { authApi } from './auth/auth.api';
import { friendsApi } from './friends/friends.api';
import { chatReducer } from './chat/chat.slice';
import { roomReducer } from './room/room.slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [friendsApi.reducerPath]: authApi.reducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
