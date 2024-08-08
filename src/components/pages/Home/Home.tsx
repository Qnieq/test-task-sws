import Header from "../../shared/header/Header";
import Sidebar from "../../shared/sidebar/Sidebar";
import styles from "./Home.module.scss"
import Desk from "../../shared/desk/Desk";
import { useRows } from "@/hooks/useRows";
import { useEffect, useState } from "react";
import { IRowTreeData } from "@/types/rows.types";

const Home = () => {
    const [data, setData] = useState<IRowTreeData[]>([])

    const {rowsData} = useRows()

    useEffect(() => {
        setData(rowsData)
    }, [rowsData])

    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.dashboard}>
                <Sidebar />
                {data &&
                    <Desk props={data!} />
                }
            </section>
        </main>
    );
}

export default Home;