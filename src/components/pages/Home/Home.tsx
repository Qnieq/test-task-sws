import Header from "../../shared/header/Header";
import Sidebar from "../../shared/sidebar/Sidebar";
import styles from "./Home.module.scss"
import Desk from "../../shared/desk/Desk";
import { useRows } from "@/hooks/useRows";

const Home = () => {
    const {rowsData} = useRows()

    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.dashboard}>
                <Sidebar />
                {rowsData &&
                    <Desk props={rowsData!} />
                }
            </section>
        </main>
    );
}

export default Home;