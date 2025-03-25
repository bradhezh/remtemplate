import {
  render,
  screen,
} from '@testing-library/react'
import Hello from '../components/Hello'

// global test functions
test('Hello', () => {
  render(<Hello name="Brad" />)
  expect(screen.getByText('Hello Brad!')).toBeInTheDocument()
})
