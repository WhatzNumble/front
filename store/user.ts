import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
    setToken: (
      state,
      action: PayloadAction<{token: string}>
    ) => {
      return {
        ...state,
        token: action.payload.token
      }
    },
    login: (
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
    socialLogin: (
      state,
      action: PayloadAction<{
        accessCode: string;
        socialType: SocialType;
      }>
    ) => {
      const { accessCode, socialType } = action.payload;
      switch (socialType) {
        case 'kakao':
          break;
        default:
          return { ...state };
      }
      return {
        ...state,
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
