import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Pagination';

test('renders MyComponent correctly', () => {
  render(<Pagination />);
  const myElement = screen.getByText(/Hello/i);
  expect(myElement).toBeInTheDocument();
});
