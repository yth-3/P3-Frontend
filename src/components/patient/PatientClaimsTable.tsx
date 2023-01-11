import { useSetRecoilState } from 'recoil';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { modalState, claimState } from '../../App';
import { VIEW_PATIENT_CLAIM } from '../../utility/constants';

import { Claim } from '../../utility/types';

type Props = {
  claims: Claim[];
};
export default function PatientsClaimsTable({ claims }: Props) {
  const setModal = useSetRecoilState(modalState);
  const setClaim = useSetRecoilState(claimState);

  function handleDetailsClick(claim: Claim) {
    setModal(VIEW_PATIENT_CLAIM);
    setClaim(claim);
  }

  return (
    <table className='w-full text-sm text-left text-gray-500 mt-4 rounded-md'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-200 rounded-lg'>
        <tr className='py-5 rounded-lg'>
          <th className='px-8 py-2'>Status</th>
          <th className='px-8 py-2'>Submitted</th>
          <th className='px-8 py-2'>Type</th>
          <th className='px-8 py-2'>Description</th>
          <th className='px-8 py-2'>Details</th>
        </tr>
      </thead>
      <tbody>
        {claims.map((claim) => {
          return (
            <tr key={claim.id} className='bg-white border-b'>
              <TableDataText text={claim.status} />
              <TableDataText
                text={`${
                  claim.submitted.getUTCMonth() + 1
                }-${claim.submitted.getUTCDate()}-${claim.submitted.getUTCFullYear()}`}
              />
              <TableDataText text={claim.type} />
              <TableDataText text={claim.description} />
              <td className='px-8'>
                <button
                  onClick={() => handleDetailsClick(claim)}
                  className='bg-slate-200 p-1 rounded flex'
                >
                  Details
                  <ArrowTopRightOnSquareIcon className='w-5 h-5' />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TableDataText({ text }: { text: string | number }) {
  return <td className='px-8 py-5'>{text}</td>;
}
