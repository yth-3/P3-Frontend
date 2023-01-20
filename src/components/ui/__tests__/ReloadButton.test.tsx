import { render } from '@testing-library/react';
import ReloadButton from '../ReloadButton';

it('renders without crashing', () => {
  render(<ReloadButton onClick={() => {}} />);
});
