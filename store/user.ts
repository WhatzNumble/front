import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Router from 'next/router';

export interface User {
  isLoggedIn: boolean;
  userID: string;
  userEmail: string;
  nickName: string;
  userAvatar: string;
  token: string;
}

export type SocialType = 'kakao' | 'google';

const initialState: User = {
  isLoggedIn: false,
  userID: '',
  userEmail: '',
  nickName: '',
  userAvatar: '',
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
    loadUser: (
      state,
      action: PayloadAction<{
        userID: string;
        nickName: string;
        userAvatar: string;
        userEmail: string;
      }>
    ) => {
      const { userID, userEmail, nickName, userAvatar = 'defaultAvatar' } = action.payload;
      return {
        ...state,
        userEmail: userEmail,
        isLoggedIn: true,
        userID: userID,
        nickName: nickName,
        userAvatar: userAvatar,
      };
    },
    login: (
      state,
      action: PayloadAction<{
        token: string;
        socialType: SocialType;
      }>
    ) => {
      const { token } = action.payload;
      //todo token으로 서버에  user data 요청
      //response 상태에 따라 회원가입 페이지, or 홈페이지로 이동해야함

      //일단 서버측에서 구현된 유저데이터 response가 없으므로 mockData 추가
      //response 성공시 홈으로 redirect
      Router.push('/');
      return {
        ...state,
        userEmail: 'whatzmock@mock.com',
        isLoggedIn: true,
        userAvatar: '/profile.png',
        userID: 'userid',
        nickName: 'Whatz개발',
        token: token,
      };
    },
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
