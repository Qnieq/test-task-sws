import { useState } from "react";
import styles from "./Sidebar.module.scss"
import MenuItem from "../../ui/menu-item/MenuItem";

const menuItems: { title: string }[] = [
    { title: "По проекту" },
    { title: "Объекты" },
    { title: "РД" },
    { title: "МТО" },
    { title: "СМР" },
    { title: "График" },
    { title: "МиМ" },
    { title: "Рабочие" },
    { title: "Капвложения" },
    { title: "Бюджет" },
    { title: "Финансирование" },
    { title: "Панорамы" },
    { title: "Камеры" },
    { title: "Поручения" },
    { title: "Контрагенты" },
]

const Sidebar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true)
    const [activeItem, setActiveItem] = useState<number>(4)

    return (
        <aside className={styles.sidebar}>
            <div
                className={styles.head}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
                <div className={styles.text_box}>
                    <h3 className={styles.title}>
                        Название проекта
                    </h3>
                    <p className={styles.description}>
                        Аббревиатура
                    </p>
                </div>
                <img
                    src="/icons/menu-arrow.svg"
                    alt="menu-arrow"
                    className={styles.icon}
                    style={menuIsOpen ? { rotate: "180deg" } : {}}
                />
            </div>
            {menuIsOpen &&
                <section className={styles.menu}>
                    {menuItems.map((title, index) => (
                        <MenuItem
                            key={index}
                            activeItem={activeItem}
                            index={index}
                            setActiveItem={setActiveItem}
                            title={title.title}
                        />
                    ))}
                </section>
            }
        </aside>
    );
}

export default Sidebar;