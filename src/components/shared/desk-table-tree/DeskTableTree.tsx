import { useRows } from "@/hooks/useRows";
import { IRowTreeData } from "../../../types/rows.types";
import DeskTableItemEdit from "../desk-table-item-edit/DeskTableItemEdit";
import DeskTableItem from "../desk-table-item/DeskTableItem";
import { useState } from "react";
import styles from "./DeskTableTree.module.scss";
import { useActions } from "@/hooks/useActions";
import useDoubleClick from "@/hooks/useDoubleClick";

const DeskTableTree: React.FC<{ tree: IRowTreeData; level: number }> = ({
  tree, // Данные для текущего блока дерева
  level, // Уровень текущего блока в дереве
}) => {
  const { setTypeReq } = useActions(); // Хук для доступа к действиям из контекста

  const [isEnterDown, setIsEnterDown] = useState<boolean>(false); // Состояние для отслеживания, была ли нажата клавиша Enter

  // Функция для обработки двойного клика по блока дерева
  const onDoubleClick = (e?: React.MouseEvent): void => {
    setIsEnterDown(false); // Устанавливаем состояние, что клавиша Enter не нажата
    setRowId(tree.id); // Устанавливаем ID текущего редактируемого узла
    setTypeReq("update"); // Устанавливаем тип запроса на обновление
    e && e.stopPropagation(); // Предотвращаем всплытие события клика
  };

  const { rowId, setRowId } = useRows(); // Хук для доступа к текущему ID строки и функции его изменения
  const onItemClick = useDoubleClick(onDoubleClick); // Хук для обработки кликов по элементам

  return (
    <>
      {/* Если клавиша Enter не нажата и текущий редактируемый блок совпадает с текущим блоком */}
      {!isEnterDown && rowId === tree.id ? (
        // Отображаем компонент редактирования строки
        <DeskTableItemEdit
          level={level}
          data={tree}
          isEnterDown={isEnterDown}
          setIsEnterDown={setIsEnterDown}
        />
      ) : (
        // Иначе отображаем компонент для отображения строки
        <div onClick={onItemClick} className={styles.box}>
          <DeskTableItem level={level} tree={tree} />
        </div>
      )}
      {/* Рекурсивно рендерим дочерние блоки */}
      {tree.child.map((child, index) => (
        <DeskTableTree key={index} tree={child} level={level + 1} />
      ))}
    </>
  );
};

export default DeskTableTree;
