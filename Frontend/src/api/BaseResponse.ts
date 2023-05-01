import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios";
import React from "react";
import baseUrl from "./BaseUrl/CreateBaseUrl";

export interface BaseResponse extends InnerStatus {
    status: 200 | 400 | 500;
    description?: string;
    errors?: string[];
}

interface InnerStatus {
    isOk: boolean;
    fullError: string;
}

class SBApi {
    private _axios: AxiosInstance;
    private useAuthorization?: string = "";

    constructor(baseUrl: string) {
        this._axios = axios.create({
            baseURL: baseUrl,
        })
    }

    public async get<P = BaseResponse>(url: string, options?: AxiosRequestConfig): Promise<{ data: P } & BaseResponse> {
        return await this.makeRequest<{ data: P } & BaseResponse>("GET", url, options);
    }

    public async post<P = BaseResponse>(url: string, options?: AxiosRequestConfig): Promise<{ data: P } & BaseResponse> {
        return await this.makeRequest<{ data: P } & BaseResponse>("POST", url, options);
    }

    public withAuthorization(token?: string): this {
        this.useAuthorization = token;
        return this;
    }

    private async makeRequest<P>(method: Method, url: string, options?: AxiosRequestConfig): Promise<P> {
        let response;
        try {
            const config = this.collectConfig(method, url, options);
            response = await this._axios.request<any, { data: P & BaseResponse }>(config);
            response = response.data
            response.isOk = this.checkStatusCodeIsOk(response);
            if (!response.isOk) {
                response.fullError = this.compositeErrorDescription(response);
            }
        } catch (e) {
            return e as P;
        }
        this.useAuthorization = "";
        return response as P;
    }

    private compositeErrorDescription(response: BaseResponse): string {
        const errors = response.errors?.length ? ": " + response.errors.reduce<string>((acc, error) => acc + error, "") : "";
        return `${response.description} ${errors}`;
    }


    private collectConfig(method: Method, url: string, options?: AxiosRequestConfig): AxiosRequestConfig {
        if (this.useAuthorization) {
            return {...options, method, url, headers: {Authorization: `Bearer ${this.useAuthorization}`}}
        }
        return {...options, method, url,}
    }

    private checkStatusCodeIsOk({status}: BaseResponse) {
        return status >= 200 && status < 300;
    }
}

export const SBAPIInitial = new SBApi(baseUrl);
export const ApiProvider = React.createContext<SBApi>(SBAPIInitial)
