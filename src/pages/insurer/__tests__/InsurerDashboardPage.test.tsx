import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import InsurerDashboardPage from '../InsurerDashboardPage';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <InsurerDashboardPage />
      </BrowserRouter>
    </RecoilRoot>
  );
});
