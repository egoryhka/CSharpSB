import redux, {applyMiddleware, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {rootReducer} from "./redusers";
import {SBAPIInitial} from "../api/BaseResponse";

const injectAPI = SBAPIInitial;
export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({SBApi: injectAPI})))