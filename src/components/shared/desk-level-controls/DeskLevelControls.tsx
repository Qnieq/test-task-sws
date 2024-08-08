import { useRows } from "@/hooks/useRows";
import { IDeskLevelControlsProps } from "./desk-level-controls.types";
import styles from "./DeskLevelControls.module.scss";
import { IRowTreeData } from "@/types/rows.types";
import { useActions } from "@/hooks/useActions";

const DeskLevelControls: React.FC<IDeskLevelControlsProps> = ({
  data, // Данные текущего блока
  level, // Уровень текущего блока в дереве
}) => {
  // Хуки для доступа к функциям и состояниям из контекста
  const { setRowsData, rowsData, setRowId, setRowParentId } = useRows();
  const { setTypeReq } = useActions();

  // Функция для добавления нового блока к существующему блоку
  const addRow = (parentId: number, newRow: IRowTreeData) => {
    // Рекурсивная функция для добавления блока в дерево
    const addRowToTree = (rows: IRowTreeData[]): IRowTreeData[] => {
      return rows.map((row) => {
        // Если текущий блок является родителем, добавляем новый блок в его дочерние блоки
        if (row.id === parentId) {
          return {
            ...row,
            child: [...row.child, newRow],
          };
        } else if (row.child && row.child.length > 0) {
          // Если текущий блок имеет дочерние блоки, рекурсивно добавляем новый блок в них
          return {
            ...row,
            child: addRowToTree(row.child),
          };
        }
        // Если текущий блок не является родителем и не имеет дочерних блоков, возвращаем его как есть
        return row;
      });
    };
    setRowsData(addRowToTree(rowsData));
  };

  // Функция для удаления блока из дерева
  const deleteRow = (rowIdToDelete: number) => {
    // Рекурсивная функция для удаления блока из дерева
    const removeRowFromTree = (rows: IRowTreeData[]): IRowTreeData[] => {
      return rows
        .map((row) => {
          // Если текущий блок имеет дочерние блоки, рекурсивно удаляем блоки из них
          if (row.child && row.child.length > 0) {
            return {
              ...row,
              child: removeRowFromTree(row.child),
            };
          }
          // Если текущий блок не имеет дочерних блоков, возвращаем его
          return row;
        })
        .filter((row) => row.id !== rowIdToDelete); // Удаляем блок с указанным ID
    };

    setRowsData(removeRowFromTree(rowsData));
  };

  // Обработчик добавления нового блока
  const handleAddRow = () => {
    const id = Date.now(); // Генерируем уникальный ID для нового блока
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

    setTypeReq("create"); // Устанавливаем тип запроса на создание

    setRowParentId(data.id); // Устанавливаем ID родительского блока
    setRowId(id); // Устанавливаем ID текущего блока для редактирования
    addRow(data.id, newRow); // Добавляем новый блок к родительскому блоку
  };

  // Обработчик удаления текущего блока
  const handleDeleteRow = () => {
    setTypeReq("delete"); // Устанавливаем тип запроса на удаление

    setRowId(data.id); // Устанавливаем ID текущего блока для удаления
    deleteRow(data.id); // Удаляем текущий блок
  };

  return (
    <div
      className={styles.level_control}
      style={{ marginLeft: `${level * 18}px` }} // Отступ слева для отображения уровня блока
    >
      {level != 0 && // Отображаем линию только если блок не на уровне 0
        <div className={styles.line}></div>
      }
      {/* Кнопка для добавления нового блока */}
      <div className={styles.block}>
        <img
          src="/icons/file.svg"
          alt=""
          className={styles.add_new_row}
          onClick={handleAddRow}
        />
        {/* Кнопка для удаления текущего блока */}
        <img
          src="/icons/trash.svg"
          alt=""
          className={styles.delete_row}
          onClick={handleDeleteRow}
        />
      </div>
    </div>
  );
};

export default DeskLevelControls;