import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import AddUserPage from '../AddUserPage';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <AddUserPage />
      </BrowserRouter>
    </RecoilRoot>
  );
});
