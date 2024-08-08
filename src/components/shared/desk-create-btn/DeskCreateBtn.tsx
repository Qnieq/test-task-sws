import { IRowTreeData } from "@/types/rows.types";
import styles from "./DeskCreateBtn.module.scss"
import { useActions } from "@/hooks/useActions";
import { useRows } from "@/hooks/useRows";

const DeskCreateBtn = () => {

    const { setRowsData, setRowId, setRowParentId } = useRows();
    const { setTypeReq } = useActions();


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

        setTypeReq("create");

        setRowParentId(null);
        setRowId(id);
        setRowsData([newRow]);
    };

    return (
        <button className={styles.btn} onClick={handleAddRow}>
            <img src="/icons/file.svg" alt="" className={styles.icon} />
        </button>
    );
}

export default DeskCreateBtn;