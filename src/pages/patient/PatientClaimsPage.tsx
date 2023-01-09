import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { modalState, claimState } from '../../App';
import { VIEW_PATIENT_CLAIM } from '../../utility/constants';
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

export default function PatientClaimsPage() {
  return (
    <>
      <header>
        <h2>Manage Claims</h2>
      </header>

      <section>
        <Link to="new">New Claim</Link>
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
    setModal(VIEW_PATIENT_CLAIM);
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
                <button onClick={() => handleDetailsClick(claim)}>Details</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
