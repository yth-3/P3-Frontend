import { useState } from 'react';
import ReactDOM from 'react-dom';

import InsurerClaimsTable from '../InsurerClaimsTable';

const [, setShowResolve] = useState(false);
const claims = [
  {
    claimId: 'fcdf3806-e2aa-414f-9d2c-a4138e57391c',
    submitter: {
      userId: '9214ce05-a6f6-4b49-9b98-7c73735b0830',
      username: 'ScruffyC',
      email: 'scruffyc@fakeemail.com',
      registered: '2023-01-10 15:41:58.829',
      active: true,
      role: 'Patient',
    },
    submitted: new Date().toString(),
    claimed: 150,
    type: {
      typeId: 'MEDICATION',
      type: 'MEDICATION',
    },
    description: 'new medication',
    status: {
      statusId: 'CREATED',
      status: 'CREATED',
    },
  },
  {
    claimId: 'a56946fd-540a-44f3-9559-fbc995a76e50',
    submitter: {
      userId: '29a3e2ae-6475-456b-9faa-0c475dcc5259',
      username: 'ryan123',
      email: 'ryan1@fakeemail.com',
      registered: '2023-01-09 22:09:40.027',
      active: true,
      role: 'Patient',
    },
    submitted: '2022-01-10 00:00:00.0',
    claimed: 100,
    type: {
      typeId: 'CONSULTATION',
      type: 'CONSULTATION',
    },
    description: 'consultation with doctor',
    resolver: {
      userId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
      username: 'insurer',
      email: 'insurer@insurer.com',
      registered: '2022-01-10 00:00:00.0',
      active: true,
      role: 'Insurer',
    },
    resolved: new Date().toString(),
    settled: 70,
    status: {
      statusId: 'SETTLED',
      status: 'SETTLED',
    },
  },
  {
    claimId: '9c66ebb7-6fe7-4334-b390-134d4ccc45c7',
    submitter: {
      userId: '1a1315e1-3677-428d-8b78-bd94a8e69961',
      username: 'testerdude',
      email: 'test@test.com',
      registered: '2023-01-17 19:33:29.441',
      active: true,
      role: 'Patient',
    },
    submitted: '2023-01-09 22:09:40.027',
    claimed: 1000,
    type: {
      typeId: 'PROCEDURE',
      type: 'PROCEDURE',
    },
    description: 'surgery',
    resolver: {
      userId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
      username: 'insurer',
      email: 'insurer@insurer.com',
      registered: '2022-01-10 00:00:00.0',
      active: true,
      role: 'Insurer',
    },
    resolved: '2023-01-18 22:39:12.545',
    settled: 0,
    status: {
      statusId: 'DENIED',
      status: 'DENIED',
    },
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <InsurerClaimsTable
      claims={claims}
      setShowResolve={setShowResolve}
      isLoading={false}
    />,
    div
  );
});
