import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import VolunteerCard from "../../components/Volunteer/VolunteerCard";

import data from "../../data/volunteers.json";
import styles from "./volunteer.module.css";

const Volunteer = () => {
	return (
		<>
			<Header />
			<main className={styles.mainContent}>
				<div className={styles.leftColumn}>
					<section className={styles.introSection}>
						<h2 className={styles.pageTitle}>¡Involúcrate!</h2>
						<p className={styles.pageDescription}>
							La Asociación de Estudiantes de Videojuegos Chile siempre está
							buscando personas apasionadas para unirse a nuestro equipo como
							voluntarios. Ya seas estudiante, profesional o simplemente alguien que
							ama los videojuegos, hay muchas formas en las que puedes contribuir.
						</p>
					</section>
					<section className={styles.benefitsSection}>
						<h2>Beneficios de ser Voluntario</h2>
						<ul>
							<li>Adquiere experiencia valiosa en la industria de los videojuegos.</li>
							<li>Conéctate con profesionales y otros entusiastas.</li>
							<li>Participa en eventos y proyectos emocionantes.</li>
							<li>Mejora tu currículum y portafolio.</li>
						</ul>
					</section>
				</div>

				<div className={styles.volunteerCardsSection}>
					{data.map((volunteer, index) => (
						<VolunteerCard
							key={index}
							title={volunteer.title}
							description={volunteer.description}
							requirements={volunteer.requirements}
							formUrl={volunteer.formUrl}
							imgUrl={volunteer.imgUrl}
						/>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Volunteer;