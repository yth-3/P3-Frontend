import { useSetRecoilState } from 'recoil';
import {
  ArrowTopRightOnSquareIcon,
  ArrowsUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

import { modalState, claimState } from '../../App';
import { VIEW_PATIENT_CLAIM } from '../../utility/constants';

import { Claim } from '../../utility/types';
import { useState } from 'react';

type header = 'status' | 'submitted' | 'type';
const sortedHeaders: header[] = ['status', 'submitted', 'type'];

type Props = {
  claims: Claim[];
};
export default function PatientsClaimsTable({ claims }: Props) {
  const setModal = useSetRecoilState(modalState);
  const setClaim = useSetRecoilState(claimState);
  const [sortedColumn, setSortedColumn] = useState<header | null>(null);
  const [asc, setAsc] = useState(true);

  function sortedClaims() {
    if (!sortedColumn) {
      return claims;
    }
    const sorted = [...claims].sort((a, b) => {
      let ifAsc;
      if (sortedColumn === 'submitted') {
        if (a[sortedColumn].getTime() === b[sortedColumn].getTime()) {
          ifAsc = 0;
        } else {
          ifAsc =
            a[sortedColumn].getTime() < b[sortedColumn].getTime() ? -1 : 1;
        }
      } else {
        ifAsc = a[sortedColumn].localeCompare(b[sortedColumn]);
      }
      return asc ? ifAsc : ifAsc * -1;
    });
    return sorted;
  }

  function handleDetailsClick(claim: Claim) {
    setModal(VIEW_PATIENT_CLAIM);
    setClaim(claim);
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
      <thead className='text-xs text-gray-700 uppercase bg-gray-200 rounded-lg'>
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
        {sortedClaims().map((claim) => {
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

type SortableHeaderProps = {
  text: string;
  sorted: boolean;
  asc: boolean;
  onClick: Function;
};
function SortableHeader({ text, sorted, asc, onClick }: SortableHeaderProps) {
  return (
    <th onClick={() => onClick()} className='px-8 py-2 cursor-pointer'>
      <div className='flex gap-1 items-center'>
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
