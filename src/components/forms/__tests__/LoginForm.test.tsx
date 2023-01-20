import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from '../LoginForm';

it('renders without crashing', () => {
  render(
    <BrowserRouter>
      <LoginForm setLoading={() => {}} isLoading={false} />
    </BrowserRouter>
  );
});
