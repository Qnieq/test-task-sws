import { createContext, useEffect, useState } from "react";
import { IRowsContext } from "./provider.types";
import { ICreateRowData, ICreateRowResponse, IRowTreeData } from "@/types/rows.types";
import {
    useCreateRowInEntityMutation,
    useDeleteRowMutation,
    useGetRowTreeQuery,
    useUpdateRowMutation,
} from "@/services/rows.service";
import { useTypeRequest } from "@/hooks/useTypeRequest";

// Создаем контекст для управления данными строк, который будет доступен для компонентов, использующих этот контекст
export const RowsContext = createContext<IRowsContext>({} as IRowsContext);

const RowsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Хранение данных строк в виде дерева
    const [rowsData, setRowsData] = useState<IRowTreeData[]>([]);

    // Хранение данных новой строки и типа запроса (create/update)
    const [newRowData, setNewRowData] = useState<ICreateRowData | null>(null);

    // Хранение ID родительской строки и строки, которую нужно обновить
    const [rowParentId, setRowParentId] = useState<number>();
    const [rowId, setRowId] = useState<number>();

    // Хук для получения типа текущего запроса (create/update/delete)
    const { typeRequest } = useTypeRequest();

    // Хук для получения данных дерева строк из API
    const { data: treeData } = useGetRowTreeQuery(null);

    // Хуки для выполнения мутаций: создание, обновление и удаление строк
    const [createRowInEntity, { data: createResponseData }] = useCreateRowInEntityMutation();
    const [updateRow, { data: updateResponseData }] = useUpdateRowMutation();
    const [deleteRow, { data: deleteResponseData }] = useDeleteRowMutation();

    // Обновляем состояние данных строк при изменении данных из API
    useEffect(() => {
        if (treeData) {
            setRowsData(treeData);
        }
    }, [treeData]);

    // Функция для обновления дерева строк с учетом ответа API
    const updateTreeWithResponse = (tree: IRowTreeData[], response: ICreateRowResponse): IRowTreeData[] => {
        // Создаем мапу для быстрого поиска изменений по ID
        const changedMap = new Map<number, IRowTreeData>(
            response.changed.map(item => [item.id, item])
        );

        // Рекурсивно обновляем дерево строк
        const updateRow = (row: IRowTreeData): IRowTreeData => {
            // Находим изменения для текущего узла
            const changed = changedMap.get(row.id);
            console.log(changed);
            // Если изменения есть, применяем их
            if (changed) {
                return {
                    ...row,
                    ...changed, // Обновляем все поля, которые есть в `changed`
                    child: row.child ? row.child.map(updateRow) : []
                };
            }

            // Если изменений нет, рекурсивно обновляем дочерние элементы
            return {
                ...row,
                child: row.child ? row.child.map(updateRow) : []
            };
        };

        // Обновляем все узлы в дереве
        return tree.map(updateRow);
    };

    // Обновляем состояние данных строк при получении ответа на создание или обновление
    useEffect(() => {
        if (createResponseData) {
            const updatedTree = updateTreeWithResponse(rowsData, createResponseData);
            setRowsData(updatedTree);
        }
    }, [createResponseData]);

    useEffect(() => {
        if (deleteResponseData) {
            const updatedTree = updateTreeWithResponse(rowsData, deleteResponseData);
            setRowsData(updatedTree);
        }
    }, [deleteResponseData])

    useEffect(() => {
        if (updateResponseData) {
            const updatedTree = updateTreeWithResponse(rowsData, updateResponseData);
            setRowsData(updatedTree);
        }
    }, [updateResponseData])

    // Обрабатываем запрос на создание, обновление или удаление строки
    useEffect(() => {
        if (newRowData) {
            if (typeRequest.typeReq === "create") {
                createRowInEntity({
                    equipmentCosts: newRowData.equipmentCosts,
                    estimatedProfit: newRowData.estimatedProfit,
                    machineOperatorSalary: newRowData.machineOperatorSalary,
                    mainCosts: newRowData.mainCosts,
                    materials: newRowData.materials,
                    mimExploitation: newRowData.mimExploitation,
                    overheads: newRowData.overheads,
                    rowName: newRowData.rowName,
                    salary: newRowData.salary,
                    supportCosts: newRowData.supportCosts,
                    parentId: rowParentId as null | number,
                });
            } else if (typeRequest.typeReq === "update") {
                updateRow({
                    data: {
                        equipmentCosts: newRowData.equipmentCosts,
                        estimatedProfit: newRowData.estimatedProfit,
                        machineOperatorSalary: newRowData.machineOperatorSalary,
                        mainCosts: newRowData.mainCosts,
                        materials: newRowData.materials,
                        mimExploitation: newRowData.mimExploitation,
                        overheads: newRowData.overheads,
                        rowName: newRowData.rowName,
                        salary: newRowData.salary,
                        supportCosts: newRowData.supportCosts,
                    },
                    parentId: rowsData[0].id, // Устанавливаем parentId для обновления строки
                    rowId: rowId!, // Обновляем строку по её ID
                });
            }
            setNewRowData(null); // Сбрасываем данные новой строки после обработки
        } else if (typeRequest.typeReq === "delete") {
            deleteRow({
                rowId: rowId! // Удаляем строку по её ID
            });
        }
    }, [newRowData, typeRequest.typeReq, rowId]);

    // Обновляем строку при получении новых данных из ответа создания
    useEffect(() => {
        const editRow = (rows: IRowTreeData[]): IRowTreeData[] => {
            return rows.map((row) => {
                if (row.id === rowId) {
                    return {
                        ...createResponseData!.current,
                        child: row.child,
                    };
                }

                if (row.child && row.child.length > 0) {
                    return {
                        ...row,
                        child: editRow(row.child),
                    };
                }

                return row;
            });
        };

        if (createResponseData) {
            setRowsData((prevRows) => editRow(prevRows));
        }
    }, [createResponseData]);

    // Предоставляем состояние и функции управления строками через контекст
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