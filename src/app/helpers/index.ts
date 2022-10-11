import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { UserDetails } from 'app/store/auth/auth.api';
import { store } from '../store';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const connectWithSocketServer = (user: UserDetails) => {
  const token = user.token ?? JSON.parse(localStorage.getItem('auth') || '{}')?.token;

  socket = io('http://localhost:5002', {
    auth: {
      token,
    },
  });
  socket.on('connect', () => {
    console.log('Connected to socket server');
    console.log(socket?.id ?? 'No socket id');
  });

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;
    store.dispatch({ type: 'friends/setPendingFriendsInvitations', payload: pendingInvitations });
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;
    store.dispatch({ type: 'friends/setFriends', payload: friends });
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch({ type: 'friends/setOnlineUsers', payload: onlineUsers });
  });
};