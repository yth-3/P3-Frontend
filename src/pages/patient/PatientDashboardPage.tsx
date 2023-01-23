import { principalState } from '../../App';
import LargeLink from '../../components/ui/LargeLink';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import InlineModal from '../../components/InlineModal';
import NewClaim from '../../modals/patient/NewClaim';
import LargeButton from '../../components/ui/LargeButton';

export default function PatientDashboardPage() {
  const principal = useRecoilValue(principalState);
  const [showNew, setShowNew] = useState(false);

  function handleFinish() {
    setShowNew(false);
  }

  return (
    <>
      <main className='flex flex-col gap-10 items-center max-w-lg m-auto text-blue-900'>
        <header className='flex flex-col items-center pt-8'>
          <h2 className='text-4xl'>Welcome, {principal?.username}!</h2>
        </header>

        <section className='flex gap-4'>
          <LargeButton onClick={() => setShowNew(true)}>New Claim</LargeButton>
          <LargeLink to='claims'>View Claims</LargeLink>
        </section>
        <section>
          <h2 className='text-xl'>This your dashboard.</h2>
          <div>
            From here you can file a new claim for medications, procedures or
            any consultations you received. You can also view previous claims
            you have submitted and check on their status
          </div>
        </section>
      </main>
      {showNew && (
        <InlineModal onClose={() => setShowNew(false)}>
          <NewClaim onFinish={handleFinish} />
        </InlineModal>
      )}
    </>
  );
}
