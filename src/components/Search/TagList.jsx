import styles from "./taglist.module.css";
import TagItem from "./TagItem";

const TagList = (props) => {
    return(
        <ul className={styles.tagContainer}>
        {props.tags.map((tag, index) => 
            <TagItem name={tag} index={index}/>
        )}
        </ul>
    )
}

export default TagList;