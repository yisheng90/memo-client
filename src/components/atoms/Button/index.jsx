import React from 'react'
import * as PropTypes from 'prop-types';
import './style.css'

const buttonTypes = ['primary', 'danger']

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
            onClick={() => onClick && onClick()}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    type: buttonTypes[0]
}

Button.propTypes = {
    type: PropTypes.oneOf(buttonTypes),
    block: PropTypes.bool,
    disable: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.string
}