import { createContext, useEffect, useState } from "react";
import { IRowsContext } from "./provider.types";
import { ICreateRowData, IRowTreeData } from "@/types/rows.types";
import { useCreateRowInEntityMutation, useGetRowTreeQuery } from "@/services/rows.service";

export const RowsContext = createContext<IRowsContext>({} as IRowsContext)

const RowsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [rowsData, setRowsData] = useState<IRowTreeData[]>([{
        child: [],
        equipmentCosts: 0,
        estimatedProfit: 0,
        id: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: "",
        salary: 0,
        supportCosts: 0,
        total: 0
    }])
    const [rowCreateData, setRowCreateData] = useState<ICreateRowData | null>(null)
    const [rowParentId, setRowParentId] = useState<number>()
    const [rowId, setRowId] = useState<number>()

    const { data: treeData } = useGetRowTreeQuery(null)
    const [createRowInEntity, { data: createResponseData }] = useCreateRowInEntityMutation()

    useEffect(() => {
        if (treeData) {
            setRowsData(treeData)
        }
    }, [treeData])

    useEffect(() => {
        if (rowCreateData) {
            createRowInEntity({
                equipmentCosts: rowCreateData!.equipmentCosts,
                estimatedProfit: rowCreateData!.estimatedProfit,
                machineOperatorSalary: rowCreateData!.machineOperatorSalary,
                mainCosts: rowCreateData!.mainCosts,
                materials: rowCreateData!.materials,
                mimExploitation: rowCreateData!.mimExploitation,
                overheads: rowCreateData!.overheads,
                rowName: rowCreateData!.rowName,
                salary: rowCreateData!.salary,
                supportCosts: rowCreateData!.supportCosts,
                parentId: rowParentId!
            })
            setRowCreateData(null)
        }
    }, [rowCreateData])

    return (
        <RowsContext.Provider value={{
            setRowsData,
            rowsData,
            setRowCreateData,
            setRowParentId,
            rowParentId,
            setRowId,
            rowId
        } as IRowsContext}>
            {children}
        </RowsContext.Provider>
    );
}

export default RowsProvider;