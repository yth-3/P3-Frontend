import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import InsurerClaimsTable from '../../components/insurer/InsurerClaimsTable';
import ReloadButton from '../../components/ui/ReloadButton';
import ResolveClaim from '../../modals/insurer/ResolveClaim';
import InlineModal from '../../components/InlineModal';
import { Claim } from '../../utility/types';
import { backendApi } from '../../utility/api';
import { principalState } from '../../App';

export default function InsurerClaimsPage() {
  const principal = useRecoilValue(principalState);
  const [showResolve, setShowResolve] = useState(false);

  const [, setError] = useState('');
  const [claims, setClaims] = useState<Claim[]>([]);

  const fetchClaims = useCallback(() => {
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
        setError(error.response.data.message);
      });
  }, [principal]);

  useEffect(() => {
    if (!principal) return;

    fetchClaims();
  }, [principal, fetchClaims]);

  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-3xl font-bold text-blue-800'>Manage Claims</h2>
        </header>

        <section>
          <ReloadButton onClick={fetchClaims} />
          <InsurerClaimsTable claims={claims} setShowResolve={setShowResolve} />
        </section>
      </main>
      {showResolve && (
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim onFinish={() => {}} />
        </InlineModal>
      )}
    </>
  );
}
