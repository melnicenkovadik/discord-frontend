import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/auth/auth.slice';
import { friendsActions } from '../store/friends/friends.slice';
import { chatActions } from '../store/chat/chat.slice';
import { roomActions } from '../store/room/room.slice';

const actionCreators = {
  ...authActions,
  ...friendsActions,
  ...chatActions,
  ...roomActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
