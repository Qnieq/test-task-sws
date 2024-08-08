import { ICreateRowData, IRowTreeData } from "@/types/rows.types";
import { Dispatch, SetStateAction } from "react";

export interface IRowsContext {
    rowsData: IRowTreeData[]
    setRowsData: Dispatch<SetStateAction<IRowTreeData[]>>
    setRowCreateData: Dispatch<SetStateAction<ICreateRowData | null>>
    setRowEditId: Dispatch<SetStateAction<number>>
    rowEditId: number
}