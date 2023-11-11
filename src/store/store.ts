import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

// ensure these types stay up to date as we add new state slices or make changes to middleware settings.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
