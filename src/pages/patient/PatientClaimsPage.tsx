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
        <button>New</button>
        <ClaimsTable claims={claims} />
      </section>
    </>
  )
}

type TableProps = {
  claims: Claim[]
};
function ClaimsTable({ claims }: TableProps) {
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
                <button>Details</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
