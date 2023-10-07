import { combineReducers } from "@reduxjs/toolkit";

import usersReducer from './user/user.slice'

const rootReducer = combineReducers({
  users: usersReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
