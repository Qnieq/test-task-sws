import { IMenuItemProps } from "./menu-item.types";
import styles from "./MenuItem.module.scss"

const MenuItem: React.FC<IMenuItemProps> = ({
    activeItem,
    setActiveItem,
    index,
    title
}) => {
    return (
        <div
            className={styles.menu_item}
            style={activeItem == index ? { background: "#a1a1aa" } : {}}
            onClick={() => setActiveItem(index)}
        >
            <img
                src="/icons/project-icon.svg"
                alt="project-icon"
                className={styles.icon}
            />
            <div className={styles.menu_item_name_box}>
                <h3 className={styles.name}>
                    {title}
                </h3>
            </div>
        </div>
    );
}

export default MenuItem;