import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'src/types';
import { IUser } from 'src/types/Reponse';

export interface IUserState {
  user: Maybe<IUser>;
  isAuthenticated: boolean;
  accessToken: string;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
  accessToken: '',
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.accessToken = '';
      state.isAuthenticated = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { userLogout, refreshToken, loginSuccess, updateUser } = userSlice.actions;

export default userSlice.reducer;
