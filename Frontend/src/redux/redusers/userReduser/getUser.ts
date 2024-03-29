import {fetchUserProfileActions, getUserAction, otherUserProfileState} from "../../types/user/otherUserProfile";

const initialUserState: otherUserProfileState = {
    isFounded: null,
    email: "",
    name: "",
    image: "",
    surname: "",
    loading: false,
    error: null,
};

export const getUserProfileReducer = (state = initialUserState, action: getUserAction): otherUserProfileState => {
    switch (action.type) {
        case fetchUserProfileActions.GET_USER:
            return {isFounded: null, email: "", name: "", image: "", surname: "", loading: false, error: null};
        case fetchUserProfileActions.GET_USER_SUCCESS:
            return {
                isFounded: action.payload.isFounded,
                email: action.payload.email,
                name: action.payload.name,
                image: action.payload.image,
                surname: action.payload.surname,
                loading: false,
                error: null,
            };
        case fetchUserProfileActions.GET_USER_ERROR:
            return {
                isFounded: null,
                email: "",
                name: "",
                image: "",
                surname: "",
                loading: false,
                error: "Ошибка сервера"
            };
        case fetchUserProfileActions.GET_USER_NOT_FOUND:
            return {
                isFounded: false,
                email: "",
                name: "",
                image: "",
                surname: "",
                loading: false,
                error: "Пользоваиель не найден"
            };
        case fetchUserProfileActions.CLEAR_USER:
            return {
                isFounded: null,
                email: "",
                name: "",
                image: "",
                surname: "",
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
