import React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {lorem} from 'faker'
import {Textarea} from './index'

const mockOnBlur = jest.fn()
const mockOnFocus = jest.fn()
const mockOnChange = jest.fn()
const TEST_ID = 'textarea'

describe('Textarea', () => {
    afterEach(() => cleanup())

    it('should render an textarea field', () => {
        const {container} = render(
            <Textarea value={lorem.sentence()} onFocus={mockOnFocus} onBlur={mockOnBlur}
                      onChange={mockOnChange}/>)
        expect(container.querySelector(TEST_ID)).toBeTruthy()
    })

    it('should trigger onFocus when the it is focused', () => {
        const {getByTestId} = render(
            <Textarea value={lorem.sentence()} onFocus={mockOnFocus} onBlur={mockOnBlur}
                      onChange={mockOnChange}/>
        )

        const inputElement = getByTestId(TEST_ID)

        fireEvent.focus(inputElement)

        expect(mockOnFocus).toHaveBeenCalled()
    })

    it('should trigger onBlur when the it is blurred', () => {
        const {getByTestId} = render(<Textarea value={lorem.sentence()} onFocus={mockOnFocus} onBlur={mockOnBlur}
                                               onChange={mockOnChange}/>)
        const inputElement = getByTestId(TEST_ID)

        fireEvent.change(inputElement, {target: {value: lorem.sentence()}})
        fireEvent.blur(inputElement)

        expect(mockOnBlur).toHaveBeenCalled()
    })

    it('should trigger onChange when the it value is changed', () => {
        const expectedText = lorem.sentence()
        const {getByTestId} = render(<Textarea value={lorem.sentence()} onFocus={mockOnFocus} onBlur={mockOnBlur}
                                               onChange={mockOnChange}/>)
        const inputElement = getByTestId(TEST_ID)

        fireEvent.change(inputElement, {target: {value: expectedText}})

        expect(mockOnChange).toHaveBeenCalledWith(expectedText)
    })

    it('should show word count if the it is focused and the text length is less than 15 characters before reaching the limit', () => {
        const {getByTestId} = render(
            <Textarea value={Array(130).fill(1).join('')} onFocus={mockOnFocus} onBlur={mockOnBlur}
                      onChange={mockOnChange}/>
        )
        const inputElement = getByTestId(TEST_ID)

        fireEvent.focus(inputElement)

        const wordCountElm = getByTestId('word_count')

        expect(wordCountElm).toBeTruthy()
    })

    it('should not show word count if the it is focused and the text length is more than 15 characters before reaching the limit', () => {
        const {getByTestId, queryByTestId} = render(
            <Textarea
                value={lorem.text(35)}
                onFocus={mockOnFocus} onBlur={mockOnBlur}
                onChange={mockOnChange}
            />
        )
        const inputElement = getByTestId(TEST_ID)

        fireEvent.focus(inputElement)

        const wordCountElm = queryByTestId('word_count')

        expect(wordCountElm).toBeFalsy()
    })
})
