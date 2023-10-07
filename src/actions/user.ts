import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersDto  } from '../interfaces/user/user'

export const fetchUsers = createAsyncThunk('githubUsers', async (accountantPortalUsers: UsersDto) => {
    return accountantPortalUsers;
});