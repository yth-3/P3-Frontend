import { useNavigate } from 'react-router-dom';
import InsurerClaimsTable from '../../components/insurer/InsurerClaimsTable';

import ReloadButton from '../../components/ui/ReloadButton';
import { Claim } from '../../utility/types';

const claims: Claim[] = [
  {
    id: 'ccfa5d99-7b97-4f5b-a2d5-60154d12e9d5',
    submitterId: '29a3e2ae-6475-456b-9faa-0c475dcc5259',
    submitted: new Date(),
    claimed: 570,
    type: 'Consultation',
    description: 'Consulted for runny nose',
    status: 'Pending',
  },
  {
    id: '9d13b8d2-c888-4648-a3c4-b6d39046a565',
    submitterId: '9214ce05-a6f6-4b49-9b98-7c73735b0830',
    submitted: new Date(),
    claimed: 678,
    type: 'Surgery',
    description: 'Plastic surgery',
    status: 'Approved',
    resolverId: '67890',
    resolved: new Date(),
    settled: 123
  }
];

export default function InsurerClaimsPage() {
  const navigate = useNavigate();

  async function fetch() {
    navigate('');
  }

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
  )
}
