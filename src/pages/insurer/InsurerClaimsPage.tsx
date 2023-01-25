import { useCallback, useEffect, useState } from 'react';
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
  const [isLoading, setLoading] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);

  const fetchClaims = useCallback(() => {
    setLoading(true);
    backendApi
      .get('claims', {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        setClaims(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setLoading(false);
      });
  }, [principal]);

  useEffect(() => {
    if (!principal) return;

    fetchClaims();
  }, [principal, fetchClaims]);

  function finishResolveClaim() {
    fetchClaims();
    setShowResolve(false);
  }

  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-sky-900 text-4xl'>Manage Claims</h2>
        </header>

        <section>
          <ReloadButton onClick={fetchClaims} />
          <InsurerClaimsTable
            claims={claims}
            isLoading={isLoading}
            setShowResolve={setShowResolve}
          />
        </section>
      </main>
      {showResolve && (
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim onFinish={finishResolveClaim} />
        </InlineModal>
      )}
    </>
  );
}
