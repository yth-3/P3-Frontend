import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';

import UserInfo from '../../modals/admin/UserInfo';
import { User } from '../../utility/types';
import InlineModal from '../InlineModal';

type header = {
  field: 'username' | 'role' | 'active';
  order: 'ascending' | 'descending';
};

type Props = {
  users: User[];
};

export default function AdminUsersTable({ users }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  function handleDetailsClick(user: User) {
    setUser(user);
    setShowInfo(true);
  }

  const [sortConfig, setSortConfig] = useState<header | null>(null);

  const sortedUsers = useMemo(() => {
    let sortedUsers = [...users];
    if (sortConfig !== null) {
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

  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 mt-4'>
        <thead className='text-xs text-gray-700 capitalize bg-gray-50'>
          <tr>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('username')}>
                Username
              </button>
            </th>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('role')}>
                Role
              </button>
            </th>
            <th className='px-8 py-2'>
              <button type='button' onClick={() => setSort('active')}>
                Activation Status
              </button>
            </th>
            <th className='px-8 py-2'>Details</th>
          </tr>
        </thead>
        <tbody>{sortedUsers.map(formatUser)}</tbody>
      </table>
      {showInfo && user && (
        <InlineModal onClose={() => setShowInfo(false)}>
          <UserInfo user={user} />
        </InlineModal>
      )}
    </>
  );

  function setSort(field: header['field']) {
    let order: header['order'] = 'ascending';
    if (sortConfig?.field === field && sortConfig?.order === order) {
      order = 'descending';
    }
    setSortConfig({ field, order });
  }

  function formatUser(user: User) {
    return (
      <tr key={user.userId} className='bg-white border-b'>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td>{user.active ? 'Active' : 'Inactive'}</td>
        <td className='px-8'>
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
}
