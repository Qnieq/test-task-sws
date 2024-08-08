import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rowsApi } from "../services/rows.service";

const reducer = combineReducers({
    [rowsApi.reducerPath]: rowsApi.reducer,
})

export const store = configureStore({
    reducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rowsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch