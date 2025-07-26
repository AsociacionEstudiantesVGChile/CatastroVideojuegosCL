import styles from "./filtersection.module.css";

const FilterSection = ({ title, options, category, names, filterProps }) => {
    const isOpen = filterProps.activeSection === category;
    const selected = filterProps.filters[category] || [];

    const handleToggle = () => {
        filterProps.setActiveSection(isOpen ? null : category);
    }

    const clearOptions = (e) => {
        e.stopPropagation();
        filterProps.clearCategory(category);
    }

    const renderCheckboxes = (options, category, names = null) => (
        options.map((option, index) => (
            <label key={index} style={{ display: 'block' }}>
                <input
                    type="checkbox"
                    value={option}
                    checked={filterProps.isChecked(category, option)}
                    onChange={() => filterProps.handleCheckboxChange(category, option)} />
                {names === null ? option : names[index]}
            </label>
        )));

    return (
        <div>
            <div className={styles.titleContainer}  onClick={handleToggle}>
                <label>{title}</label>
                {selected.length > 0 && <button className={styles.clearButton} type="button" onClick={clearOptions}>X</button>}
            </div>
            {isOpen && renderCheckboxes(options, category, names)}
        </div>
    )
}

export default FilterSection;