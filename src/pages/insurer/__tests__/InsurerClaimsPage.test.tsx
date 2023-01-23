import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import InsurerClaimsPage from '../InsurerClaimsPage';

it('renders without crashing', () => {
  render(
    <RecoilRoot>
      <InsurerClaimsPage />
    </RecoilRoot>
  );
});
