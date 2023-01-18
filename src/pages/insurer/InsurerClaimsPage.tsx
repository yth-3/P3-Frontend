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

  useEffect(() => {
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
  }, [principal]);

  function fetch() {
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
  }

  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-3xl font-bold text-blue-800'>Manage Claims</h2>
        </header>

        <section>
          <ReloadButton onClick={fetch} />
          <InsurerClaimsTable claims={claims} />
        </section>
      </main>
    </>
  );
}
