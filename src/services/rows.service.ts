import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICreateRowData,
    ICreateRowResponse,
    IDeleteRowRequest,
    IDeleteRowResponse,
    IRowTreeData,
    IUpdateRowRequest,
    IUpdateRowResponse
} from "../types/rows.types";
import { MAIN_ROW_ID } from "../constants/row.constants";


export const rowsApi = createApi({
    reducerPath: "rowsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity` }),
    endpoints: (builder) => ({
        createRowInEntity: builder.mutation<ICreateRowResponse, ICreateRowData>({
            query: (data) => ({
                url: `/${MAIN_ROW_ID.eID}/row/create`,
                method: "POST",
                body: data
            })
        }),

        updateRow: builder.mutation<IUpdateRowResponse, IUpdateRowRequest>({
            query: (data) => ({
                url: `/${MAIN_ROW_ID.eID}/row/${data.rowId}/update`,
                method: "POST",
                body: data.data
            })
        }),

        getRowTree: builder.query<IRowTreeData[], null>({
            query: () => ({
                url: `/${MAIN_ROW_ID.eID}/row/list`,
                method: "GET"
            })
        }),

        deleteRow: builder.mutation<IDeleteRowResponse, IDeleteRowRequest>({
            query: (data) => ({
                url: `/${MAIN_ROW_ID.eID}/row/${data.rowId}/delete`,
                method: "DELETE"
            })
        }),
    })
})

export const {
    useCreateRowInEntityMutation,
    useDeleteRowMutation,
    useGetRowTreeQuery,
    useUpdateRowMutation
} = rowsApi