import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootState} from "../redux/redusers";

export const useTypeSelector: TypedUseSelectorHook<rootState> = useSelector;
