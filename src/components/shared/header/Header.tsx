import { useState } from "react"
import styles from "./Header.module.scss"

const icons: { icon: string }[] = [
    { icon: "/icons/menu.svg" },
    { icon: "/icons/back.svg" },
]

const navigation: { name: string }[] = [
    { name: "Просмотр" },
    { name: "Управление" },
]

const Header = () => {
    const [activeOption, setActiveOption] = useState<number>(0)

    return (
        <header className={styles.header}>
            <section className={styles.navigation_icons}>
                {icons.map((icon, index) => (
                    <img key={index} src={icon.icon} alt="icon" className={styles.icon} />
                ))}
            </section>
            <nav className={styles.navigation}>
                {navigation.map((option, index) => (
                    <div
                        className={styles.option_box}
                        onClick={() => setActiveOption(index)}
                        style={activeOption == index ? {borderBottom: "2px solid #fff", marginBottom: "-2px"} : {}}
                    >
                        <h3 key={index} className={styles.option_title}>
                            {option.name}
                        </h3>
                    </div>
                ))}
            </nav>
        </header>
    );
}

export default Header;