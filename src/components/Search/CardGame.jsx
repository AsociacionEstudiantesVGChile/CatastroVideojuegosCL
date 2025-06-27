
import styles from "./cardgame.module.css"


const CardGame = (props) => {

    return (
        <div className={styles.container}>
            <img className={styles.imgHolder} src={props.imgUrl}>
            </img>
            <div className={styles.contentHolder}>
                <h1 className={styles.title}>{props.title}</h1>
                <h2 className={styles.devName}>{props.devName}</h2>
                <h3 className={styles.year}>{props.year}</h3>
                <p className={styles.description}>{props.description}</p>
                <ul className={styles.tagContainer}>
                    {props.tags.map((tag,index) =>
                        <li key={index} className={styles.tag}>
                            {tag}
                        </li>
                    )}
                </ul>


            </div>
        </div>
    )
}

export default CardGame;