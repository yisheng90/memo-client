import React, {useState, useCallback} from 'react'
import './style.css'

const MAX_CHAR_COUNT = 140
const SHOW_CHAR_COUNT_AT = 15

export const Textarea = ({value, onBlur, onFocus, onChange}) => {
    const [showCount, setShowCount] = useState(false)

    const checkShowCount = useCallback(() => value && setShowCount(MAX_CHAR_COUNT - value.length < SHOW_CHAR_COUNT_AT), [value])

    const handleChange = useCallback(event => {
        const inputValue = event.target.value

        if (inputValue.length <= MAX_CHAR_COUNT) {
            onChange(event.target.value)
        }

        checkShowCount()
    }, [onChange, checkShowCount])

    const handleBlur = useCallback((e) => {
        setShowCount(false)
        onBlur(e.target.value)
    }, [onBlur])

    const handleFocus = useCallback(() => {
        checkShowCount()
        onFocus()
    }, [onFocus, checkShowCount])

    return (
        <>
          <textarea
              data-testid="textarea"
              value={value || ''}
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}/>

            {showCount && (
                <span className="textarea__word_counter" data-testid="word_count">
                    {value.length}/{MAX_CHAR_COUNT}
                </span>
            )}
        </>
    )
}
