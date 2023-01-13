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
            <b>Email Address: </b>
            {user?.email}
          </h3>
          <h3>
            <b>Role: </b>
            {user?.role}
          </h3>
          <h3>
            <b>Date Registered: </b>
            {user?.registered.substring(0, user?.registered.indexOf(' '))}
          </h3>
          <h3>
            <b>Activation Status: </b>
            {user?.active ? 'Active' : 'Inactive'}
          </h3>
        </div>
      )}
    </>
  );
}
