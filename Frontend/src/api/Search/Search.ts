import axios from "axios";
import {SearchResponceProps} from "../../components/Header/SearchField/SearchModalField";
import requestUrl from "../BaseUrl/CreateBaseUrl";

export interface SearchResponce {
    data: { conferences: SearchItems, users: SearchItems }
    isEmpty: boolean;
    searchText: string;
}

export interface SearchItems {
    items: searchData[];
    total: number;
}

export interface searchData {
    logo: string;
    name: string;
    link: string;
    email: string;
}

export const getSearchInfo = async (text: string) => {
    const {data} = await axios.get<SearchResponce>(requestUrl + `search?text=${text}`);
    return data;
}
