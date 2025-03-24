import {
  render,
  screen,
} from '@testing-library/react'
import Hello from '../components/Hello'

test('Hello', () => {
  render(<Hello name="Brad" />)
  expect(screen.getByText('Hello Brad!')).toBeInTheDocument()
})
