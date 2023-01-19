import { render, screen } from '@testing-library/react';
import { Claim } from '../../../utility/types';
// import PatientsClaimsTable from '../PatientClaimsTable';

// test('table renders the appropriate amount of rows', () => {
//   const claims: Claim[] = [];
//   render(<PatientsClaimsTable claims={claims} loading={false} />);
//   const emptyStatus = screen.getByText(/You have no claims/i);
//   expect(emptyStatus).toBeInTheDocument();
// });
test('basic addition works in javascript', () => {
  expect(1 + 1).toEqual(2);
});
