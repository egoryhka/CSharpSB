import {combineReducers} from "redux";
import {userAuthReducer} from "./userReduser/auth";
import {ThemeReducer} from "./ThemeReducer/Theme";
import {getUserProfileReducer} from "./userReduser/getUser";

export const rootReducer = combineReducers({
    fetchUser: getUserProfileReducer,
    authUser: userAuthReducer,
    theme: ThemeReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
