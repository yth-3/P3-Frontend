import LandingPage from '../LandingPage';

import { render, screen } from '@testing-library/react';

test('landing page renders', () => {
  render(<LandingPage />);
  const welcomeMessage = screen.getByText('Welcome to Composite Care');
  expect(welcomeMessage).toBeInTheDocument();
});
