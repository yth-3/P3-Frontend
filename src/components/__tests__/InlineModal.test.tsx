import InlineModal from '../InlineModal';

import { render, screen } from '@testing-library/react';

test('modal renders children', () => {
  render(
    <InlineModal onClose={() => {}}>
      <div>Child Div</div>
    </InlineModal>
  );
  const child = screen.getByText('Child Div');
  expect(child).toBeInTheDocument();
});
