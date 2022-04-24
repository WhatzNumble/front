import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  isLoggedIn: boolean;
  userID: string;
  userEmail: string;
  nickName: string;
  userAvatar: string;
}

const initialState: User = {
  isLoggedIn: false,
  userID: "",
  userEmail: "",
  nickName: "",
  userAvatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userID: string;
        nickName: string;
        userAvatar: string;
        userEmail: string;
      }>
    ) => {
      const { userID, userEmail, nickName, userAvatar = "defaultAvatar" } = action.payload;
      return {
        ...state,
        userEmail: userEmail,
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
