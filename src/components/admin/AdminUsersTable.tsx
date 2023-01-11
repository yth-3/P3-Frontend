import { User } from '../../utility/types';

export default function AdminUsersTable(users: User[]) {
  return (
    <table className='w-full text-sm text-left text-gray-500 mt-4'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th className='px-8'>Username</th>
          <th className='px-8'>Email</th>
          <th className='px-8'>Role</th>
          <th className='px-8'>Active</th>
          <th className='px-8'>Date Registered</th>
          <th className='px-8'>ID</th>
        </tr>
      </thead>
      <tbody>{users.map(formatUser)}</tbody>
    </table>
  );
}

function formatUser(user: User) {
  return (
    <tr key={user.userId} className='bg-white border-b'>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.active}</td>
      <td>{user.registered}</td>
      <td>{user.userId}</td>
    </tr>
  );
}
