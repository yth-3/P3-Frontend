import { useNavigate } from 'react-router-dom';

import ReloadButton from '../../components/ui/ReloadButton';
import { ApproveButton, DenyButton } from '../../components/ui/ResolveButton';
import { Claim } from '../../utility/types';

const claims: Claim[] = [
  {
    id: '12345',
    submitterId: '12345',
    submitted: new Date(),
    claimed: 123,
    type: '12345',
    description: '12345',
    status: '12345',
  }
];

export default function InsurerClaimsPage() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <h2 className='text-3xl font-bold text-blue-800'>Manage Claims</h2>
      </header>

      <section>
        <ReloadButton onClick={() => navigate("")} />
        <ClaimsTable claims={claims} />
      </section>
    </>
  )
}

type TableProps = {
  claims: Claim[]
};

function ClaimsTable({ claims }: TableProps) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Submitted</th>
          <th>Type</th>
          <th>Description</th>
          <th>Details</th>
          <th>Resolve</th>
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
                <button>Details</button>
              </td>
              <td className='flex gap-1'>
                <ApproveButton onClick={() => navigate("")}/>
                <DenyButton onClick={() => navigate("")}/>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
