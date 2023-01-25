import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { User } from '../../utility/types';
import UserInfo from '../admin/UserInfo';

const user: User = {
  userId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
  username: 'insurer',
  email: 'insurer@insurer.com',
  registered: '2022-01-10 00:00:00.0',
  active: true,
  role: 'Insurer',
};

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserInfo user={user} />
      </BrowserRouter>
    </RecoilRoot>
  );
});
