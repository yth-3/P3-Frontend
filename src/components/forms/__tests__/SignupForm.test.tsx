import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignupForm from '../SignupForm';

it('renders without crashing', () => {
  render(
    <BrowserRouter>
      <SignupForm
        setLoading={() => {}}
        isLoading={false}
        setAccountCreated={() => {}}
      />
    </BrowserRouter>
  );
});
