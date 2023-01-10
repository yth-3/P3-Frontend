
import LargeLink from '../../components/ui/LargeLink';
import { Claim } from '../../utility/types';
import PatientClaimsTable from '../../components/patient/PatientClaimsTable';

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
  return (
    <main className='flex flex-col gap-10 items-center mt-4'>
      <header>
        <h2 className='text-sky-900 text-4xl'>My Claims</h2>
      </header>

      <section>
        <LargeLink to="new">New Claim</LargeLink>
        <PatientClaimsTable claims={claims} />
      </section>
    </main>
  )
}
