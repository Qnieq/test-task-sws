import { ICreateRowData, IRowTreeData } from "@/types/rows.types";
import { Dispatch, SetStateAction } from "react";

export interface IRowsContext {
    rowsData: IRowTreeData[]
    setRowsData: Dispatch<SetStateAction<IRowTreeData[]>>
    setRowCreateData: Dispatch<SetStateAction<ICreateRowData | null>>
    setRowParentId: Dispatch<SetStateAction<number>>
    rowParentId: number
    rowId: number
    setRowId: Dispatch<SetStateAction<number>>
}