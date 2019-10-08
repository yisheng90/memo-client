import React, { useState, useEffect, useRef, useCallback } from 'react'
import './style.css'

export const Input = ({ defaultValue = '', onBlur, onFocus }) => {
  const [value, setValue] = useState(defaultValue)
  const inputEl = useRef(null)

  const handleChange = useCallback(event => setValue(event.target.value), [])

  useEffect(() => {
    if (!value && inputEl.current) {
      inputEl.current.focus()
    }
  }, [value])

  return (
    <input
      data-testid='input'
      ref={inputEl}
      value={value}
      onFocus={onFocus}
      onChange={handleChange}
      onBlur={() => onBlur(value)}
      placeholder="Title"
    />
  )
}
