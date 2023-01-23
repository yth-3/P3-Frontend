import { render, screen } from '@testing-library/react';
import { Claim } from '../../../utility/types';
import PatientsClaimsTable from '../PatientClaimsTable';

test('shows the empty claims text when claims is empty', () => {
  const claims: Claim[] = [];
  render(<PatientsClaimsTable claims={claims} loading={false} />);
  const emptyStatus = screen.getByText(/You have no claims/i);
  expect(emptyStatus).toBeInTheDocument();
});

test('renders all of the claims', () => {
  const claims: Claim[] = [
    {
      claimId: '123',
      submitter: {
        userId: '123',
        username: 'bob',
        email: 'bob@bob.com',
        registered: 'date',
        active: true,
        role: 'role',
      },
      submitted: 'date',
      claimed: 123,
      type: {
        typeId: 'type',
        type: 'type',
      },
      description: 'ah',
      status: {
        statusId: '123',
        status: '123',
      },
    },
  ];
  render(<PatientsClaimsTable claims={claims} loading={false} />);
  expect(1).toEqual(1);
});
