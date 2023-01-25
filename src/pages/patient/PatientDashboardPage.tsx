import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import './PatientDashboardPage.css';
import { principalState } from '../../App';
import LargeLink from '../../components/ui/LargeLink';
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
      <main className='flex flex-col gap-10 items-center'>
        <header
          id='patient-header'
          className='text-lg flex flex-col items-center pt-8'
        >
          <div
            id='header-copy'
            className='bg-slate-50 opacity-90 w-1/4 p-4 rounded-lg gap-4 flex flex-col text-blue-800'
          >
            <h2 className='text-4xl'>Welcome, {principal?.username}!</h2>
            <h2>This is your dashboard.</h2>
            <h2>
              From here you can file a new claim for medications, procedures, or
              any consultations you received. You can also view previous claims
              you have submitted and check on their status
            </h2>
          </div>
        </header>

        <section className='flex gap-5 justify-center text-lg'>
          <LargeButton onClick={() => setShowNew(true)}>New Claim</LargeButton>
          <LargeLink to='claims'>View Claims</LargeLink>
        </section>
        <section></section>
      </main>
      {showNew && (
        <InlineModal onClose={() => setShowNew(false)}>
          <NewClaim onFinish={handleFinish} />
        </InlineModal>
      )}
    </>
  );
}
