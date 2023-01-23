import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboardPage from '../AdminDashboardPage';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <AdminDashboardPage />
      </BrowserRouter>
    </RecoilRoot>
  );
});
