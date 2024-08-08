import { useRows } from "@/hooks/useRows";
import { IRowTreeData } from "../../../types/rows.types";
import DeskTableItemEdit from "../desk-table-item-edit/DeskTableItemEdit";
import DeskTableItem from "../desk-table-item/DeskTableItem";
import { useState } from "react";
import useTypeClick from "@/hooks/useTypeClick";
import styles from "./DeskTableTree.module.scss";
import { useActions } from "@/hooks/useActions";

const DeskTableTree: React.FC<{ tree: IRowTreeData; level: number }> = ({
  tree,
  level,
}) => {
  const { setTypeReq } = useActions();

  const [isEnterDown, setIsEnterDown] = useState<boolean>(false);

  const onSingleClick = (e?: React.MouseEvent): void => {
    setIsEnterDown(false);
    e && e.stopPropagation();
  };

  const onDoubleClick = (e?: React.MouseEvent): void => {
    setIsEnterDown(false);
    setRowId(tree.id);
    setTypeReq("update");
    e && e.stopPropagation();
  };

  const { rowId, setRowId } = useRows();
  const onItemClick = useTypeClick(onSingleClick, onDoubleClick);

  return (
    <>
      {!isEnterDown && rowId == tree.id ? (
          <DeskTableItemEdit
            level={level}
            data={tree}
            isEnterDown={isEnterDown}
            setIsEnterDown={setIsEnterDown}
          />
        ) : (
          <div onClick={onItemClick} className={styles.box}>
            <DeskTableItem level={level} tree={tree} />
          </div>
        )}
      {tree.child.map((child, index) => (
        <DeskTableTree key={index} tree={child} level={level + 1} />
      ))}
    </>
  );
};

export default DeskTableTree;
