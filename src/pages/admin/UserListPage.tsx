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
  const pageSize = 7;
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const currentUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [users, currentPage]);

  return (
    <main className='flex flex-col gap-10 items-center mt-4'>
      <header>
        <h1 className='text-sky-900 text-4xl'>Users</h1>
      </header>
      <section>
        <AdminUsersTable users={currentUsers} />
        <Pagination
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
