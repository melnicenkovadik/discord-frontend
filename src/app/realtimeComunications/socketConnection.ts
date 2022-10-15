import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { UserDetails } from 'app/store/auth/auth.api';
import { store } from '../store';
import { chatActions } from '../store/chat/chat.slice';
import { friendsActions } from '../store/friends/friends.slice';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;


export const updateDirectChatHistoryIfActive = (data:any) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
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
                                                   }:{
  participants: string[],
  usersInCoversation: string[],
  messages: any[]
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
    store.dispatch(friendsActions.setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;
    console.log('friends-list friends', friends);
    store.dispatch(friendsActions.setFriends(friends));
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch(friendsActions.setOnlineUsers(onlineUsers));
  });

  socket.on('direct-chat-history', (data) => {
    console.log('direct-chat-history from server', data);
    updateDirectChatHistoryIfActive(data);

  });
};



export const sendDirectMessage = (data: any) => {
  console.log('sendDirectMessage', data);
  socket?.emit('direct-message', data);
};

export const getDirectChatHistory = (data: any) => {
  console.log('getDirectChatHistory', data);
  socket?.emit('direct-chat-history', data);
};