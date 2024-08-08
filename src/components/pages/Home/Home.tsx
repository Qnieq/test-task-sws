import Header from "../../shared/header/Header";
import Sidebar from "../../shared/sidebar/Sidebar";
import styles from "./Home.module.scss"
import Desk from "../../shared/desk/Desk";
import { useRows } from "@/hooks/useRows";
import { useEffect, useState } from "react";
import { IRowTreeData } from "@/types/rows.types";

const Home = () => {
    // Состояние для хранения данных блоков
    const [data, setData] = useState<IRowTreeData[]>([]);

    // Хук для получения данных блоков из контекста
    const { rowsData } = useRows();

    // Эффект для обновления состояния `data`, когда `rowsData` изменяется
    useEffect(() => {
        setData(rowsData);
    }, [rowsData]); // Зависимость от `rowsData`

    return (
        <main className={styles.main}>
            {/* Заголовок страницы */}
            <Header />
            <section className={styles.dashboard}>
                {/* Боковая панель */}
                <Sidebar />
                {/* Отображение компонента Desk, если данные блоков существуют */}
                {data && (
                    <Desk props={data!} />
                )}
            </section>
        </main>
    );
}

export default Home;