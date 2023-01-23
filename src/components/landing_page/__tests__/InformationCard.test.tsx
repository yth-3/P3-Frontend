import InformationCard from '../InformationCard';

import { render, screen } from '@testing-library/react';

test('information card shows text', () => {
  render(<InformationCard header='Header' information='Information' />);
  const header = screen.getByText('Header');
  const information = screen.getByText('Information');
  expect(header).toBeInTheDocument();
  expect(information).toBeInTheDocument();
});
