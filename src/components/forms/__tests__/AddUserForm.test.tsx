import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AddUserForm from '../AddUserForm';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <AddUserForm />
      </BrowserRouter>
    </RecoilRoot>
  );
});
