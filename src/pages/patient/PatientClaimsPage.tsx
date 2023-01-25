import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import PatientClaimsTable from '../../components/patient/PatientClaimsTable';
import LargeButton from '../../components/ui/LargeButton';
import NewClaim from '../../modals/patient/NewClaim';
import InlineModal from '../../components/InlineModal';
import { Claim } from '../../utility/types';
import { backendApi } from '../../utility/api';
import { principalState } from '../../App';
import ClaimDetail from '../../modals/patient/ClaimDetail';

export default function PatientClaimsPage() {
  const principal = useRecoilValue(principalState);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [showDetail, setShowDetail] = useState(false);

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
      .catch(() => {
        setLoading(false);
      });
  }, [principal]);

  useEffect(() => {
    if (!principal) return;
    fetchClaims();
  }, [principal, fetchClaims]);

  function finishNewClaim() {
    fetchClaims();
    setShowNew(false);
  }

  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-sky-900 text-4xl'>My Claims</h2>
        </header>

        <section>
          <LargeButton onClick={() => setShowNew(true)}>New Claim</LargeButton>
          <PatientClaimsTable
            claims={claims}
            loading={loading}
            setShowDetail={setShowDetail}
          />
        </section>
      </main>
      {showNew && (
        <InlineModal onClose={() => setShowNew(false)}>
          <NewClaim onFinish={finishNewClaim} />
        </InlineModal>
      )}
      {showDetail && (
        <InlineModal onClose={() => setShowDetail(false)}>
          <ClaimDetail />
        </InlineModal>
      )}
    </>
  );
}
