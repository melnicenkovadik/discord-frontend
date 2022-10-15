import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { UserDetails } from 'app/store/auth/auth.api';
import { store } from '../store';
import { chatActions } from '../store/chat/chat.slice';
import { friendsActions } from '../store/friends/friends.slice';
import { newRoomCreated, updateActiveRooms } from './roomHandler';
import * as webRTCHandlers from './webRTCHandlers';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const updateDirectChatHistoryIfActive = (data: any) => {
  const { participants, messages } = data;

  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState()?.auth?.user?._id;

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}: {
  participants: string[];
  usersInCoversation: string[];
  messages: any[];
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });

  if (result) {
    store.dispatch(chatActions.setMessages(messages));
  }
};

export const connectWithSocketServer = (user: UserDetails) => {
  const token = user.token ?? JSON.parse(localStorage.getItem('auth') || '{}')?.token;

  socket = io(`${process.env.REACT_APP_API_ENDPOINT}:${process.env.PORT}`, {
    auth: {
      token,
    },
  });
  socket.on('connect', () => {
    console.log('Connected to socket server');
    console.log(socket?.id ?? 'No socket id');
  });

  socket.on('friends-invitations', data => {
    const { pendingInvitations } = data;
    store.dispatch(friendsActions.setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', data => {
    const { friends } = data;
    store.dispatch(friendsActions.setFriends(friends));
  });

  socket.on('online-users', data => {
    const { onlineUsers } = data;
    store.dispatch(friendsActions.setOnlineUsers(onlineUsers));
  });

  socket.on('direct-chat-history', data => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on('room-create', data => {
    newRoomCreated(data);
  });
  socket.on('active-rooms', data => {
    updateActiveRooms(data);
  });

  socket.on('conn-prepare', data => {
    webRTCHandlers.prepareNewPeerConnection(data, false);
    socket?.emit('conn-init', { connUserSocketId: data.connUserSocketId });
  });

  socket.on('conn-init', data => {
    webRTCHandlers.prepareNewPeerConnection(data, true);
  });

  socket.on('conn-signal', data => {
    webRTCHandlers.handleSignalingData(data);
  });

  socket.on('room-participants-left', data => {
    webRTCHandlers.handleRoomParticipantsLeft(data);
  });
};

export const sendDirectMessage = (data: any) => {
  socket?.emit('direct-message', data);
};

export const getDirectChatHistory = (data: any) => {
  socket?.emit('direct-chat-history', data);
};

export const createNewRoom = () => {
  socket?.emit('room-create');
};

export const joinRoomHandler = (data: any) => {
  socket?.emit('room-join', data);
};

export const leaveRoomHandler = (data: any) => {
  socket?.emit('room-leave', data);
};

export const signalPeerData = (data: any) => {
  socket?.emit('conn-signal', data);
};
