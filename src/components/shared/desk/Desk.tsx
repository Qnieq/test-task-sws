import { IRowTreeData } from "../../../types/rows.types";
import DeskHeader from "../../ui/desk-header/DeskHeader";
import DeskTableHeader from "../../ui/desk-table-header/DeskTableHeader";
import DeskTableTree from "../desk-table-tree/DeskTableTree";
import styles from "./Desk.module.scss"



const Desk: React.FC<{ props: IRowTreeData[] }> = ({ props }) => {
    return (
        <div className={styles.desk}>
            <DeskHeader />
            <DeskTableHeader />
            {props.map((row, index) => (
                <DeskTableTree key={index} tree={row} level={0} />
            ))}
        </div>
    );
}

export default Desk;