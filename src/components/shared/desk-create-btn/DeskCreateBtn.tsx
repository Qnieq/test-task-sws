import { IRowTreeData } from "@/types/rows.types";
import styles from "./DeskCreateBtn.module.scss"
import { useActions } from "@/hooks/useActions";
import { useRows } from "@/hooks/useRows";

const DeskCreateBtn = () => {
    // Хуки для управления состоянием блоков и типом запроса
    const { setRowsData, setRowId, setRowParentId } = useRows();
    const { setTypeReq } = useActions();
  
    // Обработчик добавления нового блока
    const handleAddRow = () => {
      // Генерация уникального ID для нового блока
      const id = Date.now();
      // Создание нового блока с дефолтными значениями
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
  
      // Устанавливаем тип запроса как "create"
      setTypeReq("create");
  
      // Устанавливаем ID родительского блока как null (новый блок не имеет родителя)
      setRowParentId(null);
      // Устанавливаем ID нового блока
      setRowId(id);
      // Устанавливаем состояние блоков, добавляя новый блок в массив
      setRowsData([newRow]);
    };
  
    return (
      <button className={styles.btn} onClick={handleAddRow}>
        {/* Кнопка для создания нового блока */}
        <img src="/icons/file.svg" alt="" className={styles.icon} />
      </button>
    );
  };
  
  export default DeskCreateBtn;