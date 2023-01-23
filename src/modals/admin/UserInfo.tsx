import { User } from '../../utility/types';

export default function UserInfo(user: User) {
  return (
    <>
      {user && (
        <div>
          <h3>
            <strong>User ID: </strong>
            {user?.userId}
          </h3>
          <h3>
            <b>Username: </b>
            {user?.username}
          </h3>
          <h3>
            <b>Email address: </b>
            <a
              href={'mailto:' + user?.email}
              className='text-blue-600 hover:text-blue-500 hover:underline'
            >
              {user?.email}
            </a>
          </h3>
          <h3>
            <b>Role: </b>
            {user?.role}
          </h3>
          <h3>
            <b>Date registered: </b>
            {user?.registered.substring(0, user?.registered.indexOf(' '))}
          </h3>
          <h3>
            <b>Activation status: </b>
            {user?.active ? 'Active' : 'Inactive'}
          </h3>
        </div>
      )}
    </>
  );
}
