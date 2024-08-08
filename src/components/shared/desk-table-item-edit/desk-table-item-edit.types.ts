import { IRowTreeData } from "@/types/rows.types";
import { Dispatch, SetStateAction } from "react";

export interface IDeskTableItemEditProps {
    level: number;
    data: IRowTreeData;
    isEnterDown: boolean
    setIsEnterDown: Dispatch<SetStateAction<boolean>>;
}