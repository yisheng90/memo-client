import React from 'react'
import './style.css'

export const Button = ({ disabled, onClick , children}) => (
  <button
    data-testid="button"
    className="button__primary"
    disabled={disabled}
    onClick={onClick}>
    {children}
  </button>
)