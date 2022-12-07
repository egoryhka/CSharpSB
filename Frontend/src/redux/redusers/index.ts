import {combineReducers} from "redux";
import {userAuthReducer} from "./userReduser/auth";
import {ThemeReduser} from "./ThemeReducer/Theme";
import {getUserProfileReducer} from "./userReduser/getUser";

export const rootReducer = combineReducers({
    fetchUser: getUserProfileReducer,
    authUser: userAuthReducer,
    theme: ThemeReduser,
});

export type rootState = ReturnType<typeof rootReducer>;
