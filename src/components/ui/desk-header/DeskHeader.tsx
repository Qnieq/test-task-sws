import styles from "./DeskHeader.module.scss"

const DeskHeader = () => {
    return (
        <section className={styles.desk_header}>
            <div className={styles.block}>
                <h2 className={styles.block_name}>
                    Строительно-монтажные работы
                </h2>
            </div>
        </section>
    );
}

export default DeskHeader;