import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import FindClaim from '../FindClaim';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <FindClaim />
    </RecoilRoot>
  );
});
