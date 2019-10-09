import React from 'react'
import * as PropTypes from 'prop-types';
import './style.css'

export const Select = ({options, selectedValue, onChange}) => (
    <select
        data-testid="select"
        className="select"
        value={selectedValue}
        onChange={e => onChange(e.target.value)}>
        {options.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
)

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValue: PropTypes.string,
    onChange: PropTypes.func
}