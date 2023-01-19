import { useSetRecoilState } from 'recoil';
import {
  ArrowTopRightOnSquareIcon,
  ArrowsUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import { claimState } from '../../App';
import { Claim } from '../../utility/types';
import Spinner from '../ui/Spinner';

type header = 'status' | 'submitter' | 'submitted' | 'type';
const sortedHeaders: header[] = ['status', 'submitter', 'submitted', 'type'];

type Props = {
  claims: Claim[];
  setShowResolve: Function;
  isLoading: boolean;
};
export default function InsurerClaimsTable({
  claims,
  setShowResolve,
  isLoading,
}: Props) {
  const setClaim = useSetRecoilState(claimState);
  const [sortedColumn, setSortedColumn] = useState<header | null>(null);
  const [asc, setAsc] = useState(true);

  function sortedClaims() {
    if (!sortedColumn) return claims;
    const sorted = [...claims].sort((a, b) => {
      let ifAsc;
      if (sortedColumn === 'submitted')
        if (
          new Date(a[sortedColumn]).getTime() ===
          new Date(b[sortedColumn]).getTime()
        ) {
          ifAsc = 0;
        } else {
          ifAsc =
            new Date(a[sortedColumn]).getTime() <
            new Date(b[sortedColumn]).getTime()
              ? -1
              : 1;
        }
      else {
        if (sortedColumn === 'type')
          ifAsc = a[sortedColumn].type.localeCompare(b[sortedColumn].type);
        else if (sortedColumn === 'status')
          ifAsc = a[sortedColumn].status.localeCompare(b[sortedColumn].status);
        else
          ifAsc = a[sortedColumn].username.localeCompare(
            b[sortedColumn].username
          );
      }

      return asc ? ifAsc : ifAsc * -1;
    });
    return sorted;
  }

  function handleDetailsClick(claim: Claim) {
    setClaim(claim);
    setShowResolve(true);
  }

  function handleHeaderClick(column: header) {
    if (column !== sortedColumn) {
      setSortedColumn(column);
      setAsc(true);
    } else {
      setAsc(!asc);
    }
  }

  return (
    <table className='w-full text-sm text-left text-gray-500 mt-4 rounded-md'>
      <thead className='text-xs text-gray-700 capitalized bg-gray-50 rounded-lg'>
        <tr className='py-5 rounded-lg'>
          {sortedHeaders.map((header) => {
            return (
              <SortableHeader
                key={header}
                text={header}
                asc={asc}
                sorted={sortedColumn === header}
                onClick={() => handleHeaderClick(header)}
              />
            );
          })}
          <th className='px-8 py-2'>Description</th>
          <th className='px-8 py-2'></th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        ) : sortedClaims().length === 0 ? (
          <tr>
            <td>No claims found</td>
          </tr>
        ) : (
          sortedClaims().map((claim) => formatClaim(claim))
        )}
      </tbody>
    </table>
  );

  function formatClaim(claim: Claim) {
    return (
      <tr key={claim.claimId} className='bg-white border-b'>
        <TableDataText text={claim.status.status} />
        <TableDataText text={claim.submitter.username} />
        <TableDataText
          text={`${new Date(claim.submitted).getUTCMonth() + 1}-${new Date(
            claim.submitted
          ).getUTCDate()}-${new Date(claim.submitted).getUTCFullYear()}`}
        />
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
}

type SortableHeaderProps = {
  text: string;
  sorted: boolean;
  asc: boolean;
  onClick: Function;
};
function SortableHeader({ text, sorted, asc, onClick }: SortableHeaderProps) {
  return (
    <th onClick={() => onClick()} className='px-8 py-2 cursor-pointer'>
      <div className='flex gap-1 items-center capitalize'>
        {text}
        {sorted ? (
          asc ? (
            <ArrowUpIcon className='h-3 w-3' />
          ) : (
            <ArrowDownIcon className='h-3 w-3' />
          )
        ) : (
          <ArrowsUpDownIcon className='h-4 w-3' />
        )}
      </div>
    </th>
  );
}

function TableDataText({ text }: { text: string | number }) {
  return <td className='px-8 py-5'>{text}</td>;
}
