import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { lorem } from 'faker'
import { Button } from './index'

const mockOnClick = jest.fn()
const EXPECTED_TEXT = lorem.word()
const TEST_ID = 'button'

describe('Button', () => {
  afterEach(() => cleanup())

  it('should render Button', () => {
    const { getByTestId, getByText } = render(
      <Button onClick={mockOnClick}>{EXPECTED_TEXT}</Button>
    )
    expect(getByTestId(TEST_ID)).toBeTruthy()
    expect(getByText(EXPECTED_TEXT)).toBeTruthy()
  })

  it('should trigger onClick when it is clicked', () => {
    const { getByTestId } = render(
      <Button onClick={mockOnClick}>{EXPECTED_TEXT}</Button>
    )
    const button = getByTestId(TEST_ID)

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalled()
  })
})
