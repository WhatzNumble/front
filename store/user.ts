import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Router from 'next/router';
import { deleteCookie } from 'utils/cookie';
import axios from 'axios';
import config from 'utils/config';

export type LoginUser = {
  id: string;
  email: string;
  nickName: string;
  avatar: string;
};

export interface UserState {
  user: LoginUser;
  isLoggedIn: boolean;
  token: string;
}

export type SocialType = 'kakao' | 'google';
const initLoginUser: LoginUser = {
  id: '',
  email: '',
  nickName: '',
  avatar: '',
};

const initialState: UserState = {
  isLoggedIn: false,
  user: initLoginUser,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },
    login: (
      state,
      action: PayloadAction<{
        token: string;
        loginUser: LoginUser;
        socialType: SocialType;
      }>
    ) => {
      const { token, loginUser } = action.payload;
      //todo token으로 서버에  user data 요청
      //response 상태에 따라 회원가입 페이지, or 홈페이지로 이동해야함
      // Router.push('/');
      return {
        ...state,
        isLoggedIn: true,
        user: loginUser,
        token: token,
      };
    },
    logout: () => {
      deleteCookie('access-token', '/');
      Router.push('/');
      axios.defaults.headers.common[config.authHeaderKey] = '';
      return {
        ...initialState,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
