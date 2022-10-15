export interface IUser {
  username: string | null;
  mail: string | null;
  password: string | null;
  id?: string | null;
  _id?: string | null;
  icon?: string | null;
  token?: string | null;
}

export interface IOnlineUser {
  socketId: string;
  userId: string;
}

export interface IFriends {
  friends: IUser[];
  pendingFriendsInvitations: IUser[];
  onlineUsers: IOnlineUser[];
}

// chats

export enum ChatTypes {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
}

export interface IMessage {
  content: string;
  sameAuthor: boolean;
  author: {
    _id: string;
    username: string;
  };
  date: string;
  sameDay: boolean;
}

export interface IChatState {
  chosenChatDetails: {
    id: string;
    name: string;
    mail: string;
  } | null;
  chatType: ChatTypes | null;
  messages: IMessage[];
}
