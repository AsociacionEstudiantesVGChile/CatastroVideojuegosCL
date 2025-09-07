
import styles from "./cardgame.module.css";
import TagList from "./TagList";

const CardGame = ({info}) => {

    return (
        <div className={styles.container}>
            <img className={styles.imgHolder} src={info.img_url.replace("Game", info.title)}>
            </img>
            <div className={styles.contentHolder}>
                <h1 className={styles.title}>{info.title}</h1>
                <h2 className={styles.devName}>{info.developer}</h2>
                <h3 className={styles.year}>{info.year}</h3>
                <p className={styles.description}>{info.description}</p>
                <TagList tags={info.tags.genre} />
                <TagList tags={info.tags.language} />
                <TagList tags={info.tags.platforms} />
                <a className={styles.buttonLink} href={info.links.store}>Play Game</a>
            </div>
        </div>
    )
}




export default CardGame;