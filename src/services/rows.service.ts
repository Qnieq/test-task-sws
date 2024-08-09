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
    baseQuery: fetchBaseQuery({ baseUrl: `outlay-rows/entity/${MAIN_ROW_ID.eID}/row` }),
    endpoints: (builder) => ({
        createRowInEntity: builder.mutation<ICreateRowResponse, ICreateRowData>({
            query: (data) => ({
                url: `/create`,
                method: "POST",
                body: data
            })
        }),

        updateRow: builder.mutation<IUpdateRowResponse, IUpdateRowRequest>({
            query: (data) => ({
                url: `/${data.rowId}/update`,
                method: "POST",
                body: data.data
            })
        }),

        getRowTree: builder.query<IRowTreeData[], null>({
            query: () => ({
                url: `/list`,
                method: "GET"
            })
        }),

        deleteRow: builder.mutation<IDeleteRowResponse, IDeleteRowRequest>({
            query: (data) => ({
                url: `/${data.rowId}/delete`,
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