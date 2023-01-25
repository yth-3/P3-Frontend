import { useRecoilValue } from 'recoil';
import { principalState } from '../../App';
import { backendApi } from '../../utility/api';
import { User } from '../../utility/types';

type Props = {
  user: User;
};
export default function UserInfo({ user }: Props) {
  const principal = useRecoilValue(principalState);
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
          <button
            className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'
            type='button'
            onClick={() => toggleActive(user)}
          >
            Toggle Activation Status
          </button>
        </div>
      )}
    </>
  );

  function toggleActive(user: User) {
    if (user.active) {
      deactivate(user.userId);
    } else {
      activate(user.userId);
    }
  }

  function activate(id: string) {
    backendApi
      .put(
        `/users/activate/${id}`,
        {},
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error('Error: ' + error));
  }

  function deactivate(id: string) {
    backendApi
      .put(
        `/users/deactivate/${id}`,
        {},
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error('Error: ' + error));
  }
}
