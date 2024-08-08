import { useEffect, useState } from "react";
import DeskLevelControls from "../desk-level-controls/DeskLevelControls";
import styles from "./DeskTableItemEdit.module.scss";
import { IRowTreeData } from "@/types/rows.types";
import { useRows } from "@/hooks/useRows";
import { IDeskTableItemEditProps } from "./desk-table-item-edit.types";

const DeskTableItemEdit: React.FC<IDeskTableItemEditProps> = ({
    level, // Уровень строки в таблице
    data, // Исходные данные строки для редактирования
    setIsEnterDown, // Функция для установки состояния, что была нажата клавиша Enter
}) => {

    // Хуки из контекста строк для управления данными и состоянием
    const { setNewRowData, rowId, setRowsData, rowsData, rowParentId } = useRows();

    // Локальное состояние для хранения данных строки, которую редактируем
    const [rowData, setRowData] = useState<IRowTreeData>({
        ...data, // Инициализируем состояние данными из props
        child: data.child || [], // Устанавливаем пустой массив, если `child` не задан
        equipmentCosts: data.equipmentCosts || 0, // Устанавливаем значения по умолчанию
        estimatedProfit: data.estimatedProfit || 0,
        id: rowId, // ID строки для редактирования
        machineOperatorSalary: data.machineOperatorSalary || 0,
        mainCosts: data.mainCosts || 0,
        materials: data.materials || 0,
        mimExploitation: data.mimExploitation || 0,
        overheads: data.overheads || 0,
        rowName: data.rowName || "",
        salary: data.salary || 0,
        supportCosts: data.supportCosts || 0,
        total: data.total || 0,
    });

    // Функция для обновления строки в дерево данных
    const editRow = () => {
        // Рекурсивно обновляем строку в дерево данных
        const editRowInTree = (rows: IRowTreeData[]): IRowTreeData[] => {
            return rows.map((row) => {
                if (row.id === rowId) {
                    // Если ID строки совпадает с редактируемым, обновляем данные строки
                    return {
                        ...rowData,
                        child: row.child, // Сохраняем дочерние элементы
                    };
                } else {
                    // Если ID не совпадает, рекурсивно обновляем дочерние элементы
                    return {
                        ...row,
                        child: editRowInTree(row.child),
                    };
                }
            });
        };
        // Обновляем состояние данных строк
        setRowsData(editRowInTree(rowsData));
    };

    // Используем useEffect для обновления строки при изменении rowData
    useEffect(() => {
        editRow();
    }, [rowData]);

    // Обработчик события нажатия клавиши
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // При нажатии Enter обновляем данные строки и устанавливаем состояние
            setNewRowData({
                ...rowData,
                parentId: rowParentId!,
            });
            setIsEnterDown(true); // Устанавливаем флаг, что клавиша Enter была нажата
        }
    };

    return (
        <section className={styles.table_row}>
            <div className={styles.table_row_item} style={{ pointerEvents: "none" }}>
                {/* Компонент для отображения уровня строки */}
                <DeskLevelControls
                    data={rowData}
                    level={level}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="Название" // Placeholder для поля ввода
                    className={styles.item_name}
                    value={rowData.rowName} // Значение поля ввода
                    onChange={(e) => {
                        // Обновляем значение поля при изменении
                        setRowData((value) => ({
                            ...value,
                            rowName: e.target.value,
                        }));
                    }}
                    onKeyDown={handleKeyDown} // Обработчик нажатия клавиши
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="38200"
                    className={styles.item_name}
                    value={rowData.salary}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            salary: Number(e.target.value), // Преобразуем значение в число
                        }));
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="400000"
                    className={styles.item_name}
                    value={rowData.equipmentCosts}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            equipmentCosts: Number(e.target.value), // Преобразуем значение в число
                        }));
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="234000"
                    className={styles.item_name}
                    value={rowData.overheads}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            overheads: Number(e.target.value), // Преобразуем значение в число
                        }));
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className={styles.table_row_item}>
                <input
                    placeholder="500300"
                    className={styles.item_name}
                    value={rowData.estimatedProfit}
                    onChange={(e) => {
                        setRowData((value) => ({
                            ...value,
                            estimatedProfit: Number(e.target.value), // Преобразуем значение в число
                        }));
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </section>
    );
};

export default DeskTableItemEdit;