import { useParams } from "react-router"
import Header from "../../components/common/Header/Header";

import styles from "./gamepage.module.css"

import games_data from "../../data/videojuegos.json"
import TagList from "../../components/Search/TagList";

const GamePage = () => {
    const { id } = useParams();
    const game_data = games_data[Number(id)];
    return (
        <>
            <Header />
            {game_data ? <Content data={game_data} /> : <p>Game not found</p>}
        </>
    )
}

const Content = ({ data }) => {

    const trailer = data.links.trailer;
    const has_trailer = trailer.includes("youtu");
    const trailer_id = trailer.includes("youtu.be") ? trailer.split("/")[3] : trailer.split("=")[1];

    return (
        <div className={styles.container}>
            <section className={styles.content}>

                <img className={styles.banner} src={data.img_url.replace("Game", data.title)} />
                <h1 className={styles.title} >{data.title}</h1>
                <h3 className={styles.subtitle} >{data.developer}</h3>
                <TagList tags={[...data.tags.genre,...data.tags.language, ...data.tags.platforms]} />
                <p>{data.description}</p>
                <a className={styles.buttonLink} href={data.links.store}>Play Game</a>
                {has_trailer &&
                    <>
                        <h2>Trailer</h2>
                        <div className={styles.videoContainer}>
                            <iframe src={`https://www.youtube.com/embed/${trailer_id}`}></iframe>
                        </div>
                    </>
                }
                
            </section>
        </div>
    )

}


export default GamePage;