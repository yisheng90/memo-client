import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { lorem } from 'faker'
import { Select } from './index'

const mockOnChange = jest.fn()
const TEST_ID = 'select'
const mockOptions = [lorem.word, lorem.word]

describe('Select', () => {
  afterEach(() => cleanup())

  it('should render Select', () => {
    const { getByTestId } = render(<Select options={mockOptions} onChange={mockOnChange}
                                           selectedValue={mockOptions[0]}/>)

    expect(getByTestId(TEST_ID)).toBeTruthy()
  })

  it('should call onChange when it the option changed', () => {
    const { getByTestId } = render(<Select options={mockOptions} onChange={mockOnChange}
                                           selectedValue={mockOptions[0]}/>)
    const select = getByTestId(TEST_ID)

    fireEvent.change(select, { target: { value: mockOptions[1] } })

    expect(mockOnChange).toHaveBeenCalled()
  })
})

