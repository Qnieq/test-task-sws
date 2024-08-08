import { ICreateRowData, IRowTreeData } from "@/types/rows.types";
import { Dispatch, SetStateAction } from "react";

export interface IRowsContext {
    rowsData: IRowTreeData[]
    setRowsData: Dispatch<SetStateAction<IRowTreeData[]>>
    setNewRowData: Dispatch<SetStateAction<ICreateRowData>>
    setRowParentId: Dispatch<SetStateAction<number | null>>
    rowParentId: number
    rowId: number
    setRowId: Dispatch<SetStateAction<number>>
}