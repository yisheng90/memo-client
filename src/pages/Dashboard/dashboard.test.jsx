import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { random, lorem, date } from 'faker'
import { Dashboard } from './index'

describe('Dashboard', () => {
  afterEach(() => cleanup())

  it('should render Dashboard page', () => {
    const { getByTestId } = render(<Dashboard/>)

    expect(getByTestId('dashboard')).toBeTruthy()

  })
})

