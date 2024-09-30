import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getSearchSuggestData } from "@/service/home";
import type { ISearchSuggest } from "@/service/home";

export interface IHomeInitialState {
  navbar: ISearchSuggest;
}

const homeSlice = createSlice({
  name: "home",
  initialState: {
    navbar: {},
  } as IHomeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydrate的操作，保证服务端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.home,
        };
      })
      .addCase(fetchSearchSuggest.fulfilled, (state, { payload }) => {
        state.navbar = payload;
      });
  },
});

// 异步action
export const fetchSearchSuggest = createAsyncThunk(
  "fetchSearchSuggest",
  async () => {
    const res = await getSearchSuggestData();
    return res.data;
  }
);

// 同步action
export default homeSlice.reducer;
