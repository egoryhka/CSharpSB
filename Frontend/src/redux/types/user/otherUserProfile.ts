import * as H from "history";

export interface otherUserProfileState {
    name?: string;
    surname?: string;
    email?: string;
    image?: string;
    login?: string;
    isFounded?: boolean | null;
    loading: boolean;
    error: string | null;
}

export interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

export enum fetchUserProfileActions {
    GET_USER = 'GET_USER',
    CLEAR_USER = 'CLEAR_USER',
    GET_USER_SUCCESS = 'GET_USER_SUCCESS',
    GET_USER_ERROR = 'GET_USER_ERROR',
    GET_USER_NOT_FOUND = 'GET_USER_NOT_FOUND'
}

export type getUserAction =
    fetchUserAction
    | getUserSuccessAction
    | getUserErrorAction
    | getUserNotFoundrAction
    | clearUserInfoAction;

interface fetchUserAction {
    type: fetchUserProfileActions.GET_USER;
}

interface getUserSuccessAction {
    type: fetchUserProfileActions.GET_USER_SUCCESS;
    payload: otherUserProfileState;
}

interface getUserErrorAction {
    type: fetchUserProfileActions.GET_USER_ERROR;
}

interface getUserNotFoundrAction {
    type: fetchUserProfileActions.GET_USER_NOT_FOUND;
    payload: otherUserProfileState
}

interface clearUserInfoAction {
    type: fetchUserProfileActions.CLEAR_USER;
}
