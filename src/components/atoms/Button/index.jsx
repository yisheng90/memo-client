import React from 'react'
import './style.css'

export const Button = ({type, block, disabled, onClick, children}) => {
    let className = ['button__primary']

    if (type === 'danger') {
        className = ['button__danger']
    }

    if (block) {
        className.push('block')
    }

    return (
        <button
            data-testid="button"
            className={className.join(' ')}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    )
}
