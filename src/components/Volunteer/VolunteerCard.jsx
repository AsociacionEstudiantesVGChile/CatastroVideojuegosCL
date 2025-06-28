import styles from "./volunteercard.module.css"

const VolunteerCard = (props) => {
	return (
		<div className={styles.container}>
			<img className={styles.imgHolder} src={props.imgUrl}></img>
			<div className={styles.contentHolder}>
				<h1 className={styles.title}>{props.title}</h1>
				<p className={styles.description}>{props.description}</p>
				<h3 className={styles.requirementsTitle}>Requisitos:</h3>
				<ul className={styles.requirementsList}>
					{props.requirements.map((requirement, index) =>
						<li key={index} className={styles.requirement}>
							{requirement}
						</li>
					)}
				</ul>
				<a
					className={styles.formLink}
					href={props.formUrl}
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