import React, {useState, useEffect, useRef} from 'react'
import './style.css'

export const Input = ({defaultValue = '', onBlur}) => {
    const [value, setValue] = useState(defaultValue)
    const inputEl = useRef(null)

    const handleChange = (event) => setValue(event.target.value)

    useEffect(() => {
        if (!defaultValue && inputEl.current) {
            inputEl.current.focus()
        }
    }, [defaultValue])

    return (
        <input ref={inputEl}
               value={value}
               onChange={handleChange}
               onBlur={() => onBlur(value)}
               placeholder="Title"/>
    )
}