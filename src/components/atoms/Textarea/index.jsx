import React, { useState } from 'react'
import './style.css'

const MAX_CHAR_COUNT = 30
const MAX_CHAR_LIMIT_DISPLAY_AT = 15

export const Textarea = ({ defaultValue = '', onBlur, onFocus }) => {
  const [value, setValue] = useState(defaultValue)
  const [showCount, setShowCount] = useState(false)

  const checkShowCount = () => setShowCount(value && (MAX_CHAR_COUNT - value.length < MAX_CHAR_LIMIT_DISPLAY_AT))

  const handleChange = (event) => {
    const value = event.target.value

    if (value.length <= MAX_CHAR_COUNT) {
      setValue(event.target.value)
    }

    checkShowCount()
  }

  const handleBlur = () => {
    setShowCount(false)
    onBlur(value)
  }

  return (
    <>
      <textarea
        value={value || ''}
        onFocus={() => {
          checkShowCount()
          onFocus()
        }}
        onChange={handleChange}
        onBlur={() => handleBlur()}/>
      {showCount && (<span className="textarea__counter">{value.length}/{MAX_CHAR_COUNT}</span>)}
    </>
  )
}