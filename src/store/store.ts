import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rowsApi } from "../services/rows.service";
import typeRequestReducers from "./type-request.slice";

const reducer = combineReducers({
    typeRequest: typeRequestReducers,
    [rowsApi.reducerPath]: rowsApi.reducer,
})

export const store = configureStore({
    reducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rowsApi.middleware),
    devTools: false
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch