import type { BaseQueryApi } from "@reduxjs/toolkit/query";




export interface IError {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
}

interface IMeta {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
export interface IResponse<I> {
    data: I;
    error?: IError;
    meta?: IMeta;
}


export type IResponseRedux<I> = IResponse<I> & BaseQueryApi
