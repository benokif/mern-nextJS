"use client";
//👴wrap the Redux provider around the main entry point of the application
//👶Nextjs 13 -> every component is SS
//need to create a custom provider component that lives on the client-side and wrap it around the children nodes.
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
