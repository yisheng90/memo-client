import React, {useEffect, useRef, useCallback} from 'react'
import * as PropTypes from 'prop-types';
import './style.css'

export const Input = ({value, onBlur, onFocus, onChange, placeholder}) => {
    const inputEl = useRef(null)
    const handleChange = useCallback(event => onChange && onChange(event.target.value), [onChange])

    useEffect(() => {
        if (!value && inputEl.current) {
            inputEl.current.focus()
        }
    }, [value])

    return (
        <input
            data-testid="input"
            ref={inputEl}
            value={value}
            onFocus={onFocus}
            onChange={handleChange}
            onBlur={() => onBlur(value)}
            placeholder={placeholder}
        />
    )
}

Input.defaultProps = {
    value: '',
    placeholder: 'Please start typing'
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}
