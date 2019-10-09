import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {lorem} from 'faker'
import {Input} from './index'

const TEST_ID = 'input'

const mockOnBlur = jest.fn()
const mockOnFocus = jest.fn()
const mockOnChange = jest.fn()

describe('Input', () => {
    it('should render an input field', () => {
        const {container} = render(
            <Input value={lorem.words()}
                   onChange={mockOnChange}
                   onBlur={mockOnBlur}
                   onFocus={mockOnFocus}/>)

        expect(container.querySelector(TEST_ID)).toBeTruthy()
    })

    it('should be focused if the value is undefined', () => {
        const {getByTestId} = render(
            <Input
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onFocus={mockOnFocus}/>)

        expect(getByTestId(TEST_ID)).toHaveFocus()
    })

    it('should not focused if value is available', () => {
        const {getByTestId} = render(
            <Input value={lorem.words()}
                   onChange={mockOnChange}
                   onBlur={mockOnBlur}
                   onFocus={mockOnFocus}/>)

        expect(getByTestId(TEST_ID)).not.toHaveFocus()
    })

    it('should trigger onFocus when the it is focused', () => {
        const {getByTestId} = render(
            <Input value={lorem.words()}
                   onChange={mockOnChange}
                   onBlur={mockOnBlur}
                   onFocus={mockOnFocus}/>
        )
        const inputElement = getByTestId(TEST_ID)

        fireEvent.focus(inputElement)

        expect(mockOnFocus).toHaveBeenCalled()
    })

    it('should trigger onBlur when the it is blurred', () => {
        const {getByTestId} = render(
            <Input value={lorem.words()}
                   onChange={mockOnChange}
                   onBlur={mockOnBlur}
                   onFocus={mockOnFocus}/>)

        const inputElement = getByTestId(TEST_ID)

        fireEvent.change(inputElement, {target: {value: lorem.sentence()}})
        fireEvent.blur(inputElement)

        expect(mockOnBlur).toHaveBeenCalled()
    })

    it('should trigger onChange when the input text is changed', () => {
        const expectedText = lorem.sentence()
        const {getByTestId} = render(
            <Input value={lorem.words()}
                   onChange={mockOnChange}
                   onBlur={mockOnBlur}
                   onFocus={mockOnFocus}/>)

        const inputElement = getByTestId(TEST_ID)

        fireEvent.change(inputElement, {target: {value: expectedText}})

        expect(mockOnChange).toBeCalledWith(expectedText)
    })
})
