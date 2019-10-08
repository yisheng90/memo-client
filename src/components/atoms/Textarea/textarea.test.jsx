import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { lorem } from 'faker'
import { Textarea } from './index'

const mockOnBlur = jest.fn()
const mockOnFocus = jest.fn()
const TEST_ID = 'textarea'

describe('Textarea', () => {
  afterEach(() => cleanup())

  it('should render an textarea field', () => {
    const { container } = render(<Textarea />)
    expect(container.querySelector(TEST_ID)).toBeTruthy()
  })

  it('should call onFocus when the it is focused', () => {
    const { getByTestId } = render(
      <Textarea defaultValue={lorem.sentence()} onFocus={mockOnFocus} />
    )
    const inputElement = getByTestId(TEST_ID)

    fireEvent.focus(inputElement)

    expect(mockOnFocus).toHaveBeenCalled()
  })

  it('should call onBlur when the it is blurred', () => {
    const { getByTestId } = render(<Textarea onBlur={mockOnBlur} />)
    const inputElement = getByTestId(TEST_ID)

    fireEvent.change(inputElement, { target: { value: lorem.sentence() } })
    fireEvent.blur(inputElement)

    expect(mockOnBlur).toHaveBeenCalled()
  })

  it('should show word count if the it is focused and the text length is less than 15 characters before reaching the limit', () => {
    const { getByTestId } = render(
      <Textarea
        defaultValue={Array(130)
          .fill('1')
          .join('')}
        onFocus={mockOnFocus}
      />
    )
    const inputElement = getByTestId(TEST_ID)

    fireEvent.focus(inputElement)

    const wordCountElm = getByTestId('word_count')

    expect(wordCountElm).toBeTruthy()
  })

  it('should not show word count if the it is focused and the text length is more than 15 characters before reaching the limit', () => {
    const { getByTestId, queryByTestId } = render(
      <Textarea
        defaultValue={Array(50)
          .fill('1')
          .join('')}
        onFocus={mockOnFocus}
      />
    )
    const inputElement = getByTestId(TEST_ID)

    fireEvent.focus(inputElement)

    const wordCountElm = queryByTestId('word_count')

    expect(wordCountElm).toBeFalsy()
  })
})
