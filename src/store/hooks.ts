import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

//create typed versions of the useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//instead of importing the RootState and AppDispatch types into each component
//✅ helps avoid potential circular import dependency issues
//✅ easier to use these hooks across your application.
