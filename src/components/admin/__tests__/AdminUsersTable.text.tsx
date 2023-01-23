import { render } from '@testing-library/react';
import { User } from '../../../utility/types';
import AdminUsersTable from '../AdminUsersTable';

const users: User[] = [
  {
    userId: '29a3e2ae-6475-456b-9faa-0c475dcc5259',
    username: 'ryan123',
    email: 'ryan1@fakeemail.com',
    registered: '2023-01-09 22:09:40.027',
    active: true,
    role: 'Patient',
  },
  {
    userId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
    username: 'insurer',
    email: 'insurer@insurer.com',
    registered: '2022-01-10 00:00:00.0',
    active: true,
    role: 'Insurer',
  },
];

it('renders without crashing', () => {
  render(<AdminUsersTable users={users} />);
});
