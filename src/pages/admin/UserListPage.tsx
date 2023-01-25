import { useState, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
//import { useNavigate } from 'react-router-dom';

import { backendApi } from '../../utility/api';
import { principalState } from '../../App';
import { User } from '../../utility/types';
import AdminUsersTable from '../../components/admin/AdminUsersTable';
import Pagination from '../../utility/Pagination';

export default function UserListPage() {
  //const navigate = useNavigate();
  const principal = useRecoilValue(principalState);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!principal) {
      return;
    }
    backendApi
      .get('/users', {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
      })
      .catch((error) => console.error('Error:' + error));
  }, [principal]);

  return (
    <main className='flex flex-col gap-10 items-center mt-4'>
      <header>
        <h1 className='text-sky-900 text-4xl'>Users</h1>
      </header>
      <section>
        <AdminUsersTable users={users} />
      </section>
    </main>
  );
}
