import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import UserListPage from '../UserListPage';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserListPage />
      </BrowserRouter>
    </RecoilRoot>
  );
});
