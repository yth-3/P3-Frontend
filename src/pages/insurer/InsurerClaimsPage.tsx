import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { claimState, modalState } from '../../App';

import ReloadButton from '../../components/ui/ReloadButton';
import { RESOLVE_PATIENT_CLAIM } from '../../utility/constants';
import { Claim } from '../../utility/types';

const claims: Claim[] = [
  {
    id: '12345',
    submitterId: '12345',
    submitted: new Date(),
    claimed: 123,
    type: '12345',
    description: '12345',
    status: 'PENDING',
  },
  {
    id: '67890',
    submitterId: '12345',
    submitted: new Date(),
    claimed: 678,
    type: '67890',
    description: '67890',
    status: 'APPROVED',
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
      <header>
        <h2 className='text-3xl font-bold text-blue-800'>Manage Claims</h2>
      </header>

      <section>
        <ReloadButton onClick={() => fetch()} />
        <ClaimsTable claims={claims} />
      </section>
    </>
  )
}

type TableProps = {
  claims: Claim[]
};

function ClaimsTable({ claims }: TableProps) {
  const setModal = useSetRecoilState(modalState);
  const setClaim = useSetRecoilState(claimState);

  function handleDetailsClick(claim: Claim) {
    setModal(RESOLVE_PATIENT_CLAIM);
    setClaim(claim);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Submitted</th>
          <th>Type</th>
          <th>Description</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {claims.map((claim) => {
          return (
            <tr key={claim.id}>
              <td>{claim.status}</td>
              <td>{claim.submitted.toUTCString()}</td>
              <td>{claim.type}</td>
              <td>{claim.description}</td>
              <td>
                <button
                  className='text-blue-600 hover:underline'
                  onClick={() => handleDetailsClick(claim)}
                >
                  Details
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
