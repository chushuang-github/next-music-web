import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import homeReducer from "./modules/home";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

const makeStore = () => store;
const wrapperStore = createWrapper(makeStore);
export default wrapperStore;

// ts类型
export type IAppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
