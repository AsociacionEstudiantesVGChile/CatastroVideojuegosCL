import styles from "./tagitem.module.css";

const TagItem = (props) => {
    return(
        <>
        <li className={styles.tag} key={props.index}>{props.name}</li>
        </>
    )
}

export default TagItem;