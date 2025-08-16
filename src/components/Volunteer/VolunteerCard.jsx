import styles from "./volunteercard.module.css"

const VolunteerCard = (props) => {
	return (
		<div className={styles.container}>
			<img className={styles.imgHolder} src={props.volunteer.imgUrl}></img>
			<div className={styles.contentHolder}>
				<h1 className={styles.title}>{props.volunteer.title}</h1>
				<p className={styles.description}>{props.volunteer.description}</p>
				<h3 className={styles.requirementsTitle}>Requisitos:</h3>
				<ul className={styles.requirementsList}>
					{props.volunteer.requirements.map((requirement, index) =>
						<li key={index} className={styles.requirement}>
							{requirement}
						</li>
					)}
				</ul>
				<a
					className={styles.formLink}
					href={props.volunteer.formUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					Postula Aquí ↗️
				</a>
			</div>
		</div>
	)
}

export default VolunteerCard;