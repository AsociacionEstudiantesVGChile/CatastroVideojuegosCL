import { useState } from "react";

export function useFilter(initialCategories) {
    const initialState = Object.fromEntries(initialCategories.map(category => [category, []]));
    const [filters, setFilters] = useState(initialState);

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const currentValues = prev[category];
            const updatedValues = currentValues.includes(value) ? currentValues.filter(
                v => v !== value) : [...currentValues, value];
            return {...prev, [category]:updatedValues};
        });
    }

    const clearCategory = (category) => {
        setFilters(prev => ({
            ...prev, [category]: [],
        }));
    }

    
    
    const isChecked = (category, value) => (filters[category].includes(value))


    return { filters, handleCheckboxChange, isChecked, clearCategory};
}