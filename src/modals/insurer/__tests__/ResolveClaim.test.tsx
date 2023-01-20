import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import ResolveClaim from '../ResolveClaim';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <ResolveClaim onFinish={() => {}} />
    </RecoilRoot>
  );
});
