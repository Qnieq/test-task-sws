import { useRows } from "@/hooks/useRows";
import { IRowTreeData } from "../../../types/rows.types";
import DeskTableItemEdit from "../desk-table-item-edit/DeskTableItemEdit";
import DeskTableItem from "../desk-table-item/DeskTableItem";
import { useEffect, useState } from "react";

const DeskTableTree: React.FC<{ tree: IRowTreeData, level: number }> = ({ tree, level }) => {

    const { rowId } = useRows()

    const [isEnterDown, setIsEnterDown] = useState<boolean>(false)

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

    return (
        <>
            {!isEnterDown && rowId == tree.id ?
                <DeskTableItemEdit level={level} />
                :
                <DeskTableItem level={level} tree={tree} />
            }
            {tree.child.map((child, index) => (
                <DeskTableTree key={index} tree={child} level={level + 1} />
            ))}
        </>
    )
}

export default DeskTableTree;