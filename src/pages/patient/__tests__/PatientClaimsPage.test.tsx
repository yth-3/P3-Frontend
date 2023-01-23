import PatientClaimsPage from '../PatientClaimsPage';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

test('renders without crashing', () => {
  render(
    <RecoilRoot>
      <PatientClaimsPage />
    </RecoilRoot>
  );
  const newClaims = screen.getByText(/New Claim/i);
  expect(newClaims).toBeInTheDocument();
});
