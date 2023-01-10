import { useSetRecoilState } from 'recoil';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { modalState, claimState } from '../../App';
import { RESOLVE_PATIENT_CLAIM } from '../../utility/constants';

import { Claim } from '../../utility/types';

type Props = {
  claims: Claim[];
}

export default function InsurerClaimsTable({ claims }: Props) {
  const setModal = useSetRecoilState(modalState);
  const setClaim = useSetRecoilState(claimState);

  function handleDetailsClick(claim: Claim) {
    setModal(RESOLVE_PATIENT_CLAIM);
    setClaim(claim);
  }

  return (
    <table className='w-full text-sm text-left text-gray-500 mt-4'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th className='px-4'>Status</th>
          <th className='px-8'>Submitted</th>
          <th className='px-8'>Type</th>
          <th className='px-8'>Description</th>
          <th className='px-8'>Details</th>
        </tr>
      </thead>
      <tbody>
        {claims.map((claim) => {
          return (
            <tr key={claim.id} className='bg-white border-b'>
              <td>{claim.status}</td>
              <td>{`${claim.submitted.getUTCMonth() + 1}-${claim.submitted.getUTCDate()}-${claim.submitted.getUTCFullYear()}`}</td>
              <td>{claim.type}</td>
              <td>{claim.description}</td>
              <td>
                <button
                  onClick={() => handleDetailsClick(claim)}
                  className='bg-slate-200 p-1 rounded flex'
                >
                  Details
                  <ArrowTopRightOnSquareIcon className='w-5 h-5'/>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}