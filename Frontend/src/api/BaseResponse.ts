import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios";
import React from "react";
import baseUrl from "./BaseUrl/CreateBaseUrl";

export interface BaseResponse extends InnerStatus{
    status: 200 | 400 | 500;
    description?: string;
    errors?: string[];
}

interface InnerStatus {
    isOk: boolean;
}

class SBApi {
    private _axios: AxiosInstance;

    constructor(baseUrl: string) {
        this._axios = axios.create({
            baseURL: baseUrl,
        })
    }

    public async get<P>(url: string, options?: AxiosRequestConfig): Promise<P & BaseResponse> {
        return await this.makeRequest<P & BaseResponse>("GET", url, options);
    }

    public async post<P>(url: string, options?: AxiosRequestConfig): Promise<P & BaseResponse> {
        return await this.makeRequest<P & BaseResponse>("POST", url, options);
    }

    private async makeRequest<P>(method: Method, url: string, options?: AxiosRequestConfig): Promise<P> {
        let response;
        try {
            response = await this._axios.request<any, P & BaseResponse>({ ...options, method: method, url});
            response.isOk = this.checkStatusCodeIsOk(response);
        } catch (e) {
            return e as P;
        }
        return response as P;
    }

    private checkStatusCodeIsOk({status}: BaseResponse) {
        return status >= 200 && status < 300;
    }
}
export const SBAPIInitial = new SBApi(baseUrl);
export const ApiProvider = React.createContext<SBApi>(SBAPIInitial)
