import { useEffect, useState } from "react";
import DeskLevelControls from "../desk-level-controls/DeskLevelControls";
import styles from "./DeskTableItemEdit.module.scss"
import { IRowTreeData } from "@/types/rows.types";
import { useRows } from "@/hooks/useRows";
import { IDeskTableItemEditProps } from "./desk-table-item-edit.types";

const DeskTableItemEdit: React.FC<IDeskTableItemEditProps> = ({ level }) => {

    const [isEnterDown, setIsEnterDown] = useState<boolean>(false)

    const { setRowCreateData, rowId, setRowsData, rowsData, rowParentId } = useRows()

    const [rowData, setRowData] = useState<IRowTreeData>({
        child: [],
        equipmentCosts: 0,
        estimatedProfit: 0,
        id: rowId,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: "",
        salary: 0,
        supportCosts: 0,
        total: 0
    })

    const editRow = () => {
        const editRowInTree = (rows: IRowTreeData[]): IRowTreeData[] => {
            return rows.map((row) => {
                if (row.id === rowId) {
                    return {
                        ...rowData,
                        child: row.child,
                    };
                } else if (row.id != rowId) {
                    return {
                        ...row,
                        child: editRowInTree(row.child)
                    };
                }
                return row;
            });
        };
        setRowsData(editRowInTree(rowsData));
    };

    useEffect(() => {
        editRow()
    }, [rowData])


    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            setIsEnterDown(event.keyCode == 13)
        })

        return () => {
            document.removeEventListener("keydown", function (event) {
                setIsEnterDown(event.keyCode == 13)
            })
        }
    }, [])

    useEffect(() => {
        if (isEnterDown) {
            setRowCreateData({
                equipmentCosts: rowData.equipmentCosts,
                estimatedProfit: rowData.estimatedProfit,
                machineOperatorSalary: rowData.machineOperatorSalary,
                mainCosts: rowData.mainCosts,
                materials: rowData.materials,
                mimExploitation: rowData.mimExploitation,
                overheads: rowData.overheads,
                rowName: rowData.rowName,
                salary: rowData.salary,
                supportCosts: rowData.supportCosts,
                parentId: rowParentId
            })
        }
    }, [isEnterDown])

    return (
        <section className={styles.table_row}>
            <div className={styles.table_row_item} style={{ pointerEvents: "none" }}>
                <DeskLevelControls data={rowData} level={level} />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Название"
                    className={styles.item_name}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            rowName: e.target.value
                        }))
                    }}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Основная з/п"
                    className={styles.item_name}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            salary: Number(e.target.value)
                        })), editRow()
                    }}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Оборудование"
                    className={styles.item_name}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            equipmentCosts: Number(e.target.value)
                        }))
                    }}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Накладные"
                    className={styles.item_name}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            overheads: Number(e.target.value)
                        }))
                    }}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Прибыль"
                    className={styles.item_name}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            estimatedProfit: Number(e.target.value)
                        }))
                    }}
                />
            </div>
        </section>
    );
}

export default DeskTableItemEdit;