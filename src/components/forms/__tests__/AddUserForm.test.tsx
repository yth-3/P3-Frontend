import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddUserForm from '../AddUserForm';

it('renders without crashing', () => {
  render(
    <BrowserRouter>
      <AddUserForm />
    </BrowserRouter>
  );
});
