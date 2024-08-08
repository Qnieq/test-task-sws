import { createContext, useEffect, useState } from "react";
import { IRowsContext } from "./provider.types";
import { ICreateRowData, IRowTreeData } from "@/types/rows.types";
import {
    useCreateRowInEntityMutation,
    useDeleteRowMutation,
    useGetRowTreeQuery,
    useUpdateRowMutation,
} from "@/services/rows.service";
import { useTypeRequest } from "@/hooks/useTypeRequest";

export const RowsContext = createContext<IRowsContext>({} as IRowsContext);

const RowsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rowsData, setRowsData] = useState<IRowTreeData[]>([]);
    const [newRowData, setNewRowData] = useState<{
        data: ICreateRowData;
        typeReq: string;
    } | null>(null);

    const [rowParentId, setRowParentId] = useState<number>();
    const [rowId, setRowId] = useState<number>();

    const {typeRequest} = useTypeRequest()

    const { data: treeData } = useGetRowTreeQuery(null);
    const [createRowInEntity, { data: createResponseData }] = useCreateRowInEntityMutation();
    const [updateRow] = useUpdateRowMutation();
    const [deleteRow] = useDeleteRowMutation();
    // , { data: updateResponseData }

    useEffect(() => {
        if (treeData) {
            setRowsData(treeData);
        }
    }, [treeData]);

    useEffect(() => {
        if (newRowData) {
            if (newRowData.typeReq === "create") {
                createRowInEntity({
                    equipmentCosts: newRowData.data.equipmentCosts,
                    estimatedProfit: newRowData.data.estimatedProfit,
                    machineOperatorSalary: newRowData.data.machineOperatorSalary,
                    mainCosts: newRowData.data.mainCosts,
                    materials: newRowData.data.materials,
                    mimExploitation: newRowData.data.mimExploitation,
                    overheads: newRowData.data.overheads,
                    rowName: newRowData.data.rowName,
                    salary: newRowData.data.salary,
                    supportCosts: newRowData.data.supportCosts,
                    parentId: rowParentId as null | number,
                });
            } else if (newRowData.typeReq === "update") {
                updateRow({
                    data: {
                        equipmentCosts: newRowData.data.equipmentCosts,
                        estimatedProfit: newRowData.data.estimatedProfit,
                        machineOperatorSalary: newRowData.data.machineOperatorSalary,
                        mainCosts: newRowData.data.mainCosts,
                        materials: newRowData.data.materials,
                        mimExploitation: newRowData.data.mimExploitation,
                        overheads: newRowData.data.overheads,
                        rowName: newRowData.data.rowName,
                        salary: newRowData.data.salary,
                        supportCosts: newRowData.data.supportCosts,
                    },
                    parentId: rowsData[0].id,
                    rowId: rowId!,
                });
            }
            setNewRowData(null);
        } else if (typeRequest.typeReq === "delete") {
            deleteRow({
                rowId: rowId!
            })
        }
    }, [newRowData?.data, newRowData?.typeReq, typeRequest.typeReq]);

    useEffect(() => {
        const editRow = () => {
            const editRowInTree = (rows: IRowTreeData[]): IRowTreeData[] => {
                return rows.map((row) => {
                    if (row.id === rowId) {
                        return {
                            ...createResponseData!.current,
                            id: createResponseData!.current.id,
                            child: row.child,
                        };
                    } else if (row.id != rowId) {
                        return {
                            ...row,
                            child: editRowInTree(row.child),
                        };
                    }
                    return row;
                });
            };
            setRowsData(editRowInTree(rowsData));
        };

        if (createResponseData) {
            editRow();
        }
    }, [createResponseData]);

    return (
        <RowsContext.Provider
            value={
                {
                    setRowsData,
                    rowsData,
                    setNewRowData,
                    setRowParentId,
                    rowParentId,
                    setRowId,
                    rowId,
                } as IRowsContext
            }
        >
            {children}
        </RowsContext.Provider>
    );
};

export default RowsProvider;
