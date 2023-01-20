import { render } from '@testing-library/react';

import LogoutButton from '../LogoutButton';

it('renders without crashing', () => {
  render(<LogoutButton />);
});
