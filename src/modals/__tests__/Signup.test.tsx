import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Signup from '../Signup';

it('renders without crashing', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
});
