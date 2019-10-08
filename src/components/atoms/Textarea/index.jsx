import React, { useState } from 'react'
import './style.css'

const MAX_CHAR_COUNT = 140
const SHOW_CHAR_COUNT_AT = 15

export const Textarea = ({ defaultValue = '', onBlur, onFocus }) => {
  const [value, setValue] = useState(defaultValue)
  const [showCount, setShowCount] = useState(false)

  const checkShowCount = () =>
    setShowCount(MAX_CHAR_COUNT - value.length < SHOW_CHAR_COUNT_AT)

  const handleChange = event => {
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
        data-testid="textarea"
        value={value || ''}
        onFocus={() => {
          checkShowCount()
          onFocus()
        }}
        onChange={handleChange}
        onBlur={() => handleBlur()}
      />
      {showCount && (
        <span className="textarea__word_counter" data-testid="word_count">
          {value.length}/{MAX_CHAR_COUNT}
        </span>
      )}
    </>
  )
}
