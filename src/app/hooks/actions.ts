import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/auth/auth.slice';
import { friendsActions } from '../store/friends/friends.slice';
import { chatActions } from '../store/chat/chat.slice';

const actionCreators = {
  ...authActions,
  ...friendsActions,
  ...chatActions
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
