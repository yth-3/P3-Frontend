import { useSetRecoilState } from 'recoil';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { claimState } from '../../App';

import { Claim } from '../../utility/types';
import { useMemo, useState } from 'react';
import InlineModal from '../InlineModal';
import ResolveClaim from '../../modals/insurer/ResolveClaim';

type Props = {
  claims: Claim[];
};

type header = {
  field: 'status' | 'submitter' | 'submitted' | 'type';
  order: 'ascending' | 'descending';
};

export default function InsurerClaimsTable({ claims }: Props) {
  const setClaim = useSetRecoilState(claimState);
  const [showResolve, setShowResolve] = useState(false);

  function handleDetailsClick(claim: Claim) {
    setClaim(claim);
    setShowResolve(true);
  }

  const [sortConfig, setSortConfig] = useState<header | null>(null);

  const sortedClaims = useMemo(() => {
    let sortedClaims = [...claims];
    if (sortConfig !== null) {
      sortedClaims.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.order === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.order === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedClaims;
  }, [claims, sortConfig]);

  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 mt-4 rounded-md'>
        <thead className='text-xs text-gray-700 capitalized bg-gray-50 rounded-lg'>
          <tr className='py-5 rounded-lg'>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('status')}>
                Status
              </button>
            </th>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('submitter')}>
                Submitter
              </button>
            </th>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('submitted')}>
                Submitted
              </button>
            </th>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('type')}>
                Type
              </button>
            </th>
            <th className='px-8 py-2'>Description</th>
            <th className='px-8 py-2'>Details</th>
          </tr>
        </thead>
        <tbody>{sortedClaims.map(formatClaim)}</tbody>
      </table>
      {showResolve && (
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim onClose={() => setShowResolve(false)} />
        </InlineModal>
      )}
    </>
  );

  function formatClaim(claim: Claim) {
    return (
      <tr key={claim.claimId} className='bg-white border-b'>
        <TableDataText text={claim.status.status} />
        <TableDataText text={claim.submitter.username} />
        <TableDataText text={claim.submitted} />
        <TableDataText text={claim.type.type} />
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
  }

  function setSort(field: header['field']) {
    let order: header['order'] = 'ascending';
    if (sortConfig?.field === field && sortConfig?.order === order) {
      order = 'descending';
    }
    setSortConfig({ field, order });
  }
}

function TableDataText({ text }: { text: string | number }) {
  return <td className='px-8 py-5'>{text}</td>;
}
