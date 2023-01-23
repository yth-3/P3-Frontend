import { User } from '../../utility/types';

type Props = {
  user: User;
};
export default function UserInfo({ user }: Props) {
  return (
    <>
      {user && (
        <div>
          <h3>
            <strong>User ID: </strong>
            {user?.userId}
          </h3>
          <h3>
            <strong>Username: </strong>
            {user?.username}
          </h3>
          <h3>
            <strong>Email address: </strong>
            <a
              href={'mailto:' + user?.email}
              className='text-blue-600 hover:text-blue-500 hover:underline'
            >
              {user?.email}
            </a>
          </h3>
          <h3>
            <strong>Role: </strong>
            {user?.role}
          </h3>
          <h3>
            <strong>Date registered: </strong>
            {user?.registered.substring(0, user?.registered.indexOf(' '))}
          </h3>
          <h3>
            <strong>Activation status: </strong>
            {user?.active ? 'Active' : 'Inactive'}
          </h3>
        </div>
      )}
    </>
  );
}
