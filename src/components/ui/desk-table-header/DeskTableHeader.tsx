import styles from "./DeskTableHeader.module.scss"

const headerItemsName: { name: string }[] = [
    { name: "Уровень" },
    { name: "Наименование работ" },
    { name: "Основная з/п" },
    { name: "Оборудование" },
    { name: "Накладные расходы" },
    { name: "Сметная прибыль" },
]

const DeskTableHeader = () => {
    return (
        <section className={styles.table_header}>
            {headerItemsName.map((item, index) => (
                <div key={index} className={styles.table_header_item}>
                    <h4 className={styles.item_name}>
                        {item.name}
                    </h4>
                </div>
            ))}
        </section>
    );
}

export default DeskTableHeader;