import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { random, lorem, date } from 'faker'
import { Card } from './index'

const mockOnDelete = jest.fn()
const mockOnUpdate = jest.fn()
const mockEnableSort = jest.fn()
const mockDisableSort = jest.fn()

const mockIdea = {
  id: random.uuid(),
  title: lorem.sentence(),
  body: lorem.sentence(),
  created_at: date.past,
}

describe('Card', () => {
  afterEach(() => cleanup())

  it('should render Card with correct configuration', () => {
    const { getByTestId, queryByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    expect(getByTestId('card__container')).toBeTruthy()
    expect(getByTestId('card__details--date')).toBeTruthy()
    expect(getByTestId('input')).toBeTruthy()
    expect(getByTestId('textarea')).toBeTruthy()
    expect(queryByTestId('card__action--delete')).toBeFalsy()
  })

  it('should render Card with delete button when hovered', () => {
    const { getByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    const cardElm = getByTestId('card__container')

    fireEvent.pointerMove(cardElm)

    expect(getByTestId('card__container')).toBeTruthy()
    expect(getByTestId('card__details--date')).toBeTruthy()
    expect(getByTestId('input')).toBeTruthy()
    expect(getByTestId('textarea')).toBeTruthy()
    expect(getByTestId('card__action--delete')).toBeTruthy()
  })

  it('should trigger onDelete when delete button is clicked', () => {
    const { getByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    const cardElm = getByTestId('card__container')

    fireEvent.pointerMove(cardElm)

    const deleteButton = getByTestId('card__action--delete')

    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalled()
  })

  it('should trigger disableSort when any text field is focused', () => {
    const { getByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    const inputElm = getByTestId('input')

    fireEvent.focus(inputElm)

    expect(mockDisableSort).toHaveBeenCalled()
  })

  it('should trigger onUpdate when any text field is blurred', () => {
    const { getByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    const inputElm = getByTestId('input')

    fireEvent.change(inputElm, { target: { value: lorem.sentence() } })
    fireEvent.blur(inputElm)

    expect(mockOnUpdate).toHaveBeenCalled()
  })

  it('should trigger enableSort when any text field is blurred', () => {
    const { getByTestId } = render(
      <Card
        idea={mockIdea}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        enableSort={mockEnableSort}
        disableSort={mockDisableSort}
      />
    )

    const inputElm = getByTestId('input')

    fireEvent.blur(inputElm)

    expect(mockEnableSort).toHaveBeenCalled()
  })
})
