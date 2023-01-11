import { Claim } from '../../utility/types';
import PatientClaimsTable from '../../components/patient/PatientClaimsTable';
import LargeButton from '../../components/ui/LargeButton';
import NewClaim from '../../modals/patient/NewClaim';
import { useState } from 'react';
import InlineModal from '../../components/InlineModal';

const claims: Claim[] = [
  {
    id: '12asdf345',
    submitterId: '12345',
    submitted: new Date('2020-1-2'),
    claimed: 570,
    type: 'Consultation',
    description: 'Consulted for runny nose',
    status: 'Approved',
  },
  {
    id: '12wert3asf46',
    submitterId: '12345',
    submitted: new Date('2021-1-2'),
    claimed: 570,
    type: 'Procedure',
    description: 'Removed wart',
    status: 'Rejected',
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
  },
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
      {showNew && (
        <InlineModal onClose={() => setShowNew(false)}>
          <NewClaim />
        </InlineModal>
      )}
    </>
  );
}
