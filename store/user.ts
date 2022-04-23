import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  isLoggedIn: boolean;
  userID: string;
  nickName: string;
  userAvatar: string;
}

const initialState: User = {
  isLoggedIn: false,
  userID: "",
  nickName: "",
  userAvatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userID: string; nickName: string; userAvatar: string }>
    ) => {
      const { userID, nickName, userAvatar = "defaultAvatar" } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        userID: userID,
        nickName: nickName,
        userAvatar: userAvatar,
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
