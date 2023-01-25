import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';

import UserInfo from '../../modals/admin/UserInfo';
import Pagination from '../../utility/Pagination';
import { User } from '../../utility/types';
import InlineModal from '../InlineModal';

type header = {
  field: 'username' | 'role' | 'active';
  order: 'ascending' | 'descending';
};

type Props = {
  users: User[];
};

const headers: header['field'][] = ['username', 'role', 'active'];

export default function AdminUsersTable({ users }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<header['field'] | null>(
    null
  );
  const [asc, setAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  function handleDetailsClick(user: User) {
    setUser(user);
    setShowInfo(true);
  }

  const [sortConfig, setSortConfig] = useState<header | null>(null);

  const sortedUsers = useMemo(() => {
    let sortedUsers = [...users];
    if (sortConfig !== null) {
      setSortedColumn(sortConfig.field);
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.order === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.order === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  }, [users, sortConfig]);

  const currentUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedUsers.slice(firstPageIndex, lastPageIndex);
  }, [sortedUsers, currentPage]);

  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 mt-4 rounded-md'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 rounded-lg'>
          <tr className='py-5 rounded-lg'>
            {headers.map((header) => {
              return (
                <SortableHeader
                  key={header}
                  text={header}
                  asc={asc}
                  sorted={sortedColumn === header}
                  onClick={() => setSort(header)}
                />
              );
            })}
            <th className='px-8 py-2'></th>
          </tr>
        </thead>
        <tbody>{currentUsers.map(formatUser)}</tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      {showInfo && user && (
        <InlineModal onClose={() => setShowInfo(false)}>
          <UserInfo user={user} />
        </InlineModal>
      )}
    </>
  );

  function setSort(field: header['field']) {
    let order: header['order'] = 'ascending';
    setAsc(true);
    if (sortConfig?.field === field && sortConfig?.order === order) {
      order = 'descending';
      setAsc(false);
    }
    setSortConfig({ field, order });
  }

  function formatUser(user: User) {
    return (
      <tr key={user.userId} className='bg-white border-b'>
        <td className='px-8 py-5'>{user.username}</td>
        <td className='px-8 py-5'>{user.role}</td>
        <td className='px-8 py-5'>{user.active ? 'Active' : 'Inactive'}</td>
        <td className='px-8 py-5'>
          <button
            onClick={() => handleDetailsClick(user)}
            className='bg-slate-200 p-1 rounded flex'
          >
            Details
            <ArrowTopRightOnSquareIcon className='w-5 h-5' />
          </button>
        </td>
      </tr>
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
}
