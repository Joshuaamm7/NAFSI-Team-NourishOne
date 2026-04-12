import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NourishNet app', () => {
  render(<App />);
  const headings = screen.getAllByText(/NourishNet/i);
  expect(headings.length).toBeGreaterThan(0);
});
