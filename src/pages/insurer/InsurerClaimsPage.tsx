import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { principalState } from '../../App';
import InsurerClaimsTable from '../../components/insurer/InsurerClaimsTable';
import ReloadButton from '../../components/ui/ReloadButton';
import { backendApi } from '../../utility/api';
import { Claim } from '../../utility/types';

export default function InsurerClaimsPage() {
  const principal = useRecoilValue(principalState);
  const [, setError] = useState('');
  // const [usersMap, setUsersMap] = useState<{ [key: string]: User }>({});
  const [claims, setClaims] = useState<Claim[]>([]);

  async function fetch() {
    if (!principal) return;

    backendApi
      .get('claims', {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        setError('');
        let allClaims = response.data;
        setClaims(allClaims);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });

    /*
    let allClaims: Claim[] = [
      {
        id: '12asdf345',
        submitterId: '12345',
        submitted: new Date('2020-1-2'),
        claimed: 570,
        type: 'Consultation',
        description: 'Consulted for runny nose',
        status: 'Approved',
        resolverId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
        resolved: new Date(),
        settled: 570,
      },
      {
        id: '12wert3asf46',
        submitterId: '12345',
        submitted: new Date('2021-1-2'),
        claimed: 570,
        type: 'Procedure',
        description: 'Removed wart',
        status: 'Rejected',
        resolverId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
        resolved: new Date(),
        settled: 0,
      },
      {
        id: '121234asdf5',
        submitterId: '12345',
        submitted: new Date('2022-1-2'),
        claimed: 570,
        type: 'Medication',
        description: 'Allergy mediciine',
        status: 'Pending',
      },
      {
        id: '121253wert45',
        submitterId: '12345',
        submitted: new Date('2020-11-2'),
        claimed: 570,
        type: 'Consultation',
        description: 'Consulted for broken arm',
        status: 'Approved',
        resolverId: 'cbc98d8b-7f7e-469d-a82d-4ce3e33832b5',
        resolved: new Date(),
        settled: 285,
      },
    ];
    setClaims(allClaims);
    */
  }

  useEffect(() => {
    if (!principal) return;

    /*
    backendApi
      .get('/users/patients', {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        setError('');
        let users: User[] = response.data;
        let temp: { [key: string]: User } = {};
        users.forEach((user) => (temp[user.userId] = user));
        setUsersMap(temp);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
      */

    fetch();
  }, [principal]);

  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-3xl font-bold text-blue-800'>Manage Claims</h2>
        </header>

        <section>
          <ReloadButton onClick={() => fetch()} />
          <InsurerClaimsTable claims={claims} />
        </section>
      </main>
    </>
  );
}
