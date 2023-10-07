import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UsersDto } from "../../interfaces/user/user";
import { fetchUsers } from '../../actions/user'
import { RootState } from "../feature";

export type StateSliceInitial = {
  usersList: UsersDto;
};

const initialState: StateSliceInitial = {
  usersList: {
    incomplete_results: false,
    items: [],
    total_count: 0
  }
}

export const usersSlice = createSlice({
  name: "GithubUsers",
  initialState,
  reducers: {
    loadUsers: (state, action: PayloadAction<UsersDto>) => {
      state.usersList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
  }
});

export const usersSelector = (state: RootState) => state.users

const userReducer = usersSlice.reducer;
export const { loadUsers } = usersSlice.actions;
export default userReducer;
