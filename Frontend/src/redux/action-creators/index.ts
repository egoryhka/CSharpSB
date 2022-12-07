import {userAuth, userLogout, tokenUserAuth, userRegister} from "./userActionCreators/userAuthRegister";
import {clearUserProfile, getUserProfile} from "./userActionCreators/getUser";

export default {
    userAuth,
    userLogout,
    tokenUserAuth,
    userRegister,
    getUserProfile,
    clearUserProfile,
};
