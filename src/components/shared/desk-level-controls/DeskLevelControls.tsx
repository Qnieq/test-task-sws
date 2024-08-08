import { useRows } from "@/hooks/useRows";
import { IDeskLevelControlsProps } from "./desk-level-controls.types";
import styles from "./DeskLevelControls.module.scss"
import { IRowTreeData } from "@/types/rows.types";

const DeskLevelControls: React.FC<IDeskLevelControlsProps> = ({ data, level }) => {

    const { setRowsData, rowsData, setRowId, setRowParentId } = useRows()

    const addRow = (parentId: number, newRow: IRowTreeData) => {
        const addRowToTree = (rows: IRowTreeData[]): IRowTreeData[] => {
            return rows.map((row) => {
                if (row.id === parentId) {
                    return {
                        ...row,
                        child: [...row.child, newRow]
                    };
                } else if (row.child && row.child.length > 0) {
                    return {
                        ...row,
                        child: addRowToTree(row.child)
                    };
                }
                return row;
            });
        };
        setRowsData(addRowToTree(rowsData));
    };

    const handleAddRow = () => {
        const id = Date.now();
        const newRow: IRowTreeData = {
          child: [],
          equipmentCosts: 0,
          estimatedProfit: 0,
          id: id,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          rowName: "",
          salary: 0,
          supportCosts: 0,
          total: 0,
        };
    
        setRowParentId(data.id);
        setRowId(id);
        addRow(data.id, newRow);
      };

    return (
        <div className={styles.level_control} style={{ marginLeft: `${level * 18}px` }}>
            <img
                src="/icons/file.svg"
                alt=""
                className={styles.add_new_row}
                onClick={handleAddRow}
            />
        </div>
    );
}

export default DeskLevelControls;