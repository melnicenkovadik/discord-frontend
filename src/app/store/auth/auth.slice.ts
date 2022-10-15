import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types/models';

const authKey = 'auth';

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: localStorage.getItem(authKey) ? JSON.parse(localStorage.getItem(authKey) ?? '{}') : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      localStorage.setItem(authKey, JSON.stringify(state.user));
    },
    logout: state => {
      state.user = null;
      localStorage.setItem(authKey, JSON.stringify(null));
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
