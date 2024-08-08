import { createSlice } from "@reduxjs/toolkit";
import { ITypeRequestState } from "./store.types";

const initialState: ITypeRequestState = {
    typeReq: ""
}

const TypeRequestSlice = createSlice({
    name: "TypeRequest",
    initialState,
    reducers: {
        setTypeReq: (state, action) => {
            state.typeReq = action.payload
        }
    }
})

export const {setTypeReq} = TypeRequestSlice.actions
export default TypeRequestSlice.reducer