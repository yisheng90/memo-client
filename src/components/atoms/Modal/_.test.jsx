import React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {lorem} from 'faker'
import {Modal} from './index'

const mockOnCancel = jest.fn()
const TEST_ID = 'modal__container'

describe('Modal', () => {
    afterEach(() => cleanup())

    it('should render Modal if isVisible is true', () => {
        const expectedText = lorem.sentence()
        const {getByTestId, getByText} = render(
            <Modal isVisible onCancel={mockOnCancel}>
                <div>{expectedText}</div>
            </Modal>
        )

        expect(getByTestId(TEST_ID)).toBeTruthy()
        expect(getByText(expectedText)).toBeTruthy()
    })

    it('should render noting if isVisible is false', () => {
        const expectedText = lorem.sentence()
        const {container} = render(
            <Modal onCancel={mockOnCancel}>
                <div>{expectedText}</div>
            </Modal>
        )

        expect(container.innerHTML).toBeFalsy()
    })

    it('should trigger onCancel when close button is clicked', () => {
        const expectedText = lorem.sentence()
        const {getByTestId} = render(
            <Modal isVisible onCancel={mockOnCancel}>
                <div>{expectedText}</div>
            </Modal>
        )

        const closeButton = getByTestId('modal__action--close')

        fireEvent.click(closeButton)

        expect(mockOnCancel).toHaveBeenCalled()
    })
})
