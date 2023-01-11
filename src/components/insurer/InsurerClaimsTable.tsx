import { useSetRecoilState } from 'recoil';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { claimState } from '../../App';

import { Claim } from '../../utility/types';
import { useState } from 'react';
import InlineModal from '../InlineModal';
import ResolveClaim from '../../modals/insurer/ResolveClaim';

type Props = {
  claims: Claim[];
}

export default function InsurerClaimsTable({ claims }: Props) {
  const setClaim = useSetRecoilState(claimState);
  const [setshowResolve, setShowResolve] = useState(false);

  function handleDetailsClick(claim: Claim) {
    setClaim(claim);
  }

  function fetchUsername(submitterId: string) {
    //make GET req to b/e for username by userId = submitterId

    return '[submitter username]';
  }

  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 mt-4'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-4'>Status</th>
            <th className='px-4'>Submitter</th>
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
                <td>{fetchUsername(claim.submitterId)}</td>
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
      {setshowResolve &&
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim />
        </InlineModal>
      }
    </>
  )
}