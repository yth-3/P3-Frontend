
import { Claim } from '../../utility/types';
import PatientClaimsTable from '../../components/patient/PatientClaimsTable';
import LargeButton from '../../components/ui/LargeButton';
import NewClaim from '../../modals/patient/NewClaim';
import { useState } from 'react';
import InlineModal from '../../components/InlineModal';

const claims: Claim[] = [
  {
    id: '12345',
    submitterId: '12345',
    submitted: new Date(),
    claimed: 570,
    type: 'Consultation',
    description: 'Consulted for runny nose',
    status: 'Pending',
  }
];

export default function PatientClaimsPage() {
  const [showNew, setShowNew] = useState(false);
  return (
    <>
      <main className='flex flex-col gap-10 items-center mt-4'>
        <header>
          <h2 className='text-sky-900 text-4xl'>My Claims</h2>
        </header>

        <section>
          <LargeButton onClick={() => setShowNew(true)}>New Claim</LargeButton>
          <PatientClaimsTable claims={claims} />
        </section>
      </main>
      {showNew &&
        <InlineModal onClose={() => setShowNew(false)}>
          <NewClaim />
        </InlineModal>
      }
    </>
  )
}
