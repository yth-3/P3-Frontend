import PatientDashboardPage from '../PatientDashboardPage';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

test('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <PatientDashboardPage />
      </BrowserRouter>
    </RecoilRoot>
  );
  const viewClaimsButton = screen.getByText(/View Claims/i);
  expect(viewClaimsButton).toBeInTheDocument();
});
