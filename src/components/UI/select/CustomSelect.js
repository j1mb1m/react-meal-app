import React from 'react'

export const CustomSelect = ({ options, defaultValue, value, onChange }) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value={defaultValue}> {defaultValue}</option>
            {options.map(el =>
                <option key={el.id} value={el.name}>{el.name}</option>
            )}
        </select>
    )
}

