import { useEffect, useState } from "react";
import DeskLevelControls from "../desk-level-controls/DeskLevelControls";
import styles from "./DeskTableItemEdit.module.scss";
import { IRowTreeData } from "@/types/rows.types";
import { useRows } from "@/hooks/useRows";
import { IDeskTableItemEditProps } from "./desk-table-item-edit.types";
import { useTypeRequest } from "@/hooks/useTypeRequest";

const DeskTableItemEdit: React.FC<IDeskTableItemEditProps> = ({
  level,
  data,
  setIsEnterDown,
}) => {
  const { typeRequest } = useTypeRequest();
  const { setNewRowData, rowId, setRowsData, rowsData, rowParentId } =
    useRows();

  const [rowData, setRowData] = useState<IRowTreeData>({
    ...data,
    child: data.child || [],
    equipmentCosts: data.equipmentCosts || 0,
    estimatedProfit: data.estimatedProfit || 0,
    id: rowId,
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
            child: editRowInTree(row.child),
          };
        }
        return row;
      });
    };
    setRowsData(editRowInTree(rowsData));
  };

  useEffect(() => {
    editRow();
  }, [rowData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setNewRowData({
        data: {
          ...rowData,
          parentId: rowParentId!,
        },
        typeReq: typeRequest!.typeReq,
      });
      setIsEnterDown(true);
    }
  };

  return (
    <section className={styles.table_row}>
      <div className={styles.table_row_item} style={{ pointerEvents: "none" }}>
        <DeskLevelControls
          data={rowData}
          level={level}
        />
      </div>
      <div className={styles.table_row_item}>
        <input
          placeholder="Название"
          className={styles.item_name}
          value={rowData.rowName}
          onChange={(e) => {
            setRowData((value) => ({
              ...value,
              rowName: e.target.value,
            }));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.table_row_item}>
        <input
          placeholder="Основная з/п"
          className={styles.item_name}
          value={rowData.salary}
          onChange={(e) => {
            setRowData((value) => ({
              ...value,
              salary: Number(e.target.value),
            }));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.table_row_item}>
        <input
          placeholder="Оборудование"
          className={styles.item_name}
          value={rowData.equipmentCosts}
          onChange={(e) => {
            setRowData((value) => ({
              ...value,
              equipmentCosts: Number(e.target.value),
            }));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.table_row_item}>
        <input
          placeholder="Накладные"
          className={styles.item_name}
          value={rowData.overheads}
          onChange={(e) => {
            setRowData((value) => ({
              ...value,
              overheads: Number(e.target.value),
            }));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.table_row_item}>
        <input
          placeholder="Прибыль"
          className={styles.item_name}
          value={rowData.estimatedProfit}
          onChange={(e) => {
            setRowData((value) => ({
              ...value,
              estimatedProfit: Number(e.target.value),
            }));
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
};

export default DeskTableItemEdit;
