export interface IUser {
  username: string | null;
  mail: string | null;
  password: string | null;
  id: string | null;
  icon?: string | null;
  token?: string | null;
}
export interface IOnlineUser {
  socketId: string;
  userId: string;
}
export interface IFriends {
  friends: IUser[];
  pendingFriendsInvitations : IUser[];
  onlineUsers: IOnlineUser[];
}


// chats


export enum ChatTypes {
  'DIRECT',
  'GROUP',
}

export interface IMessage {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  createdAt: string;
}

export interface IChatState {
  chosenChatDetails : {
    id: string;
    name: string;
    mail: string;
  } | null;
  chatType : ChatTypes | null;
  messages : IMessage[];
}