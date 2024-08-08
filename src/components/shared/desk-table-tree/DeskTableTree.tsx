import { IRowTreeData } from "../../../types/rows.types";
import DeskTableItemEdit from "../desk-table-item-edit/DeskTableItemEdit";
import DeskTableItem from "../desk-table-item/DeskTableItem";

const DeskTableTree: React.FC<{ tree: IRowTreeData, level: number }> = ({ tree, level }) => {

    const conditions: boolean = tree.rowName.length > 0 

    return (
        <>
            {conditions ?
                <DeskTableItem level={level} tree={tree} />
                :
                <DeskTableItemEdit level={level} />
            }
            {tree.child.map((child, index) => (
                <DeskTableTree key={index} tree={child} level={level + 1} />
            ))}
        </>
    )
}

export default DeskTableTree;