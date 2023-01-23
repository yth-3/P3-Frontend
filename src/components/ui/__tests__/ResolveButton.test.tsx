import { render } from '@testing-library/react';

import { ApproveButton, DenyButton, SettleButton } from '../ResolveButton';

it('renders without crashing', () => {
  render(<ApproveButton onClick={() => {}} />);
});

it('renders without crashing', () => {
  render(<DenyButton onClick={() => {}} />);
});

it('renders without crashing', () => {
  render(<SettleButton onClick={() => {}} />);
});
