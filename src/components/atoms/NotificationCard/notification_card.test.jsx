import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { lorem } from 'faker'
import { NotificationCard } from './index'

const mockOnCancel = jest.fn()

describe('NotificationCard', () => {
  afterEach(() => cleanup())

  it('should render NotificationCard', () => {
    const expectedText = lorem.sentence()
    const { getByTestId, getByText } = render(<NotificationCard message={expectedText} onCancel={mockOnCancel}/>)

    expect(getByTestId('notification__card')).toBeTruthy()
    expect(getByText(expectedText)).toBeTruthy()
  })

  it('should call onCancel when the cancel button is clicked', () => {
    const { getByTestId } = render(<NotificationCard message={lorem.sentence()} onCancel={mockOnCancel}/>)
    const closeButton = getByTestId('notification__card--close')

    fireEvent.click(closeButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })
})

