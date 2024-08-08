import DeskLevelControls from "../desk-level-controls/DeskLevelControls";
import styles from "./DeskTableItem.module.scss"
import { IDeskTableItemProps } from "./desk-table-item.types";

const DeskTableItem: React.FC<IDeskTableItemProps> = ({ tree, level }) => {
    return (
        <section className={styles.table_row}>
            <div className={styles.table_row_item}>
                <DeskLevelControls data={tree} level={level} />
            </div>
            <div className={styles.table_row_item}>
                <h4 className={styles.item_name}>
                    {tree.rowName}
                </h4>
            </div>
            <div className={styles.table_row_item}>
                <h4 className={styles.item_name}>
                    {tree.salary}
                </h4>
            </div>
            <div className={styles.table_row_item}>
                <h4 className={styles.item_name}>
                    {tree.equipmentCosts}
                </h4>
            </div>
            <div className={styles.table_row_item}>
                <h4 className={styles.item_name}>
                    {tree.overheads}
                </h4>
            </div>
            <div className={styles.table_row_item}>
                <h4 className={styles.item_name}>
                    {tree.estimatedProfit}
                </h4>
            </div>
        </section>
    );
}

export default DeskTableItem;