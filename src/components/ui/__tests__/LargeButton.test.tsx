import { render, screen } from '@testing-library/react';
import LargeButton from '../LargeButton';

test('renders learn react link', () => {
  render(<LargeButton onClick={() => {}}>Large Button Test</LargeButton>);
  const buttonText = screen.getByText(/Large Button Test/i);
  expect(buttonText).toBeInTheDocument();
});
