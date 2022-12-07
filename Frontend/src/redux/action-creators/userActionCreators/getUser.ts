import {Dispatch} from "redux";
import axios from "axios";
import {fetchUserProfileActions, getUserAction, otherUserProfileState} from "../../types/user/otherUserProfile";

export const getUserProfile = (id: string) => {
    return async function (dispatch: Dispatch<getUserAction>) {
        try {
            dispatch({type: fetchUserProfileActions.GET_USER});
            const {data} = await axios.post<otherUserProfileState>(`api/Users/GetUsers/${id}`);
            if (data.isFounded) {
                dispatch({type: fetchUserProfileActions.GET_USER_SUCCESS, payload: {...data, loading: false}});
            } else {
                dispatch({type: fetchUserProfileActions.GET_USER_NOT_FOUND, payload: {...data, loading: false}});
            }

        } catch (e) {
            dispatch({type: fetchUserProfileActions.GET_USER_ERROR});
        }
    };
};

export const clearUserProfile = () => {
    return async function (dispatch: Dispatch<getUserAction>) {
        dispatch({type: fetchUserProfileActions.CLEAR_USER});
    };
};
