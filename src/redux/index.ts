import { combineReducers } from "redux";
import usersReducer from "./reducers/usersReducer";
import profileDetailsReducer from "./reducers/profileDetailsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  profileDetails: profileDetailsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
