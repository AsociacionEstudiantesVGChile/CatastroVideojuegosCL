import { useParams } from "react-router"

import styles from "./teampage.module.css"

import games_data from "../../data/videojuegos.json"
import devs_data from "../../data/desarrolladores.json"
import Header from "../../components/common/Header/Header";
import CardGame from "../../components/Search/CardGame";

const TeamPage = () => {
    const { id } = useParams();
    const dev_data = devs_data[Number(id)];
    return (
        <>
            <Header />
            {dev_data ? <Content data={dev_data} dev_id={id}/> : <p>Dev not found</p>}
        </>
    )
}

const Content = ({ data, dev_id }) => {
    const games = games_data.filter(game => (data.games.includes(game.title)))
    return (
        <div className={styles.container}>
            <section className={styles.content}>
                <h1 className={styles.devName}>{data.name}</h1>
                <h1>Juegos</h1>
                <div className={styles.gamesContainer}>
                    {games.map(gameData =>
                        <a className={styles.cardGame} href={`#/game/${games_data.findIndex(item => item === gameData)}`}>
                            <CardGame info={gameData} dev_id={dev_id}/>
                        </a>)}
                </div>
            </section>
        </div>
    )
}

export default TeamPage