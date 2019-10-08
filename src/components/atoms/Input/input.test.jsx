import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { lorem } from 'faker'
import { Input } from './index'

const mockOnBlur = jest.fn()
const mockOnFocus = jest.fn()
const TEST_ID = 'input'

describe('Input', () => {
  it('should render an input field', () => {
    const { container } = render(<Input />)
    expect(container.querySelector(TEST_ID)).toBeTruthy()
  })

  it('should be focused if the default value is undefined', () => {
    const { getByTestId } = render(<Input />)
    expect(getByTestId(TEST_ID)).toHaveFocus()
  })

  it('should not focused if default value is available', () => {
    const { getByTestId } = render(<Input defaultValue={lorem.sentence()} />)
    expect(getByTestId(TEST_ID)).not.toHaveFocus()
  })

  it('should call onFocus when the it is focused', () => {
    const { getByTestId } = render(
      <Input defaultValue={lorem.sentence()} onFocus={mockOnFocus} />
    )
    const inputElement = getByTestId(TEST_ID)

    fireEvent.focus(inputElement)

    expect(mockOnFocus).toHaveBeenCalled()
  })

  it('should call onBlur when the it is blurred', () => {
    const { getByTestId } = render(<Input onBlur={mockOnBlur} />)
    const inputElement = getByTestId(TEST_ID)

    fireEvent.change(inputElement, { target: { value: lorem.sentence() } })
    fireEvent.blur(inputElement)

    expect(mockOnBlur).toHaveBeenCalled()
  })
})
