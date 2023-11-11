"use client";

import { createSlice } from "@reduxjs/toolkit";


type User = {
  name: string;
  location: string;
};

const initialUser: User = {
  name: "",
  location: "earth",
};

type UserState = {
  user: User;
  isSidebarOpen: boolean;
};
const initialState: UserState = {
  user: initialUser,
  isSidebarOpen: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state: UserState) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  }
});

export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
