import React from 'react'
import './style.css'

export const Select = ({ options, selectedValue, onChange }) => (
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
