import { Link, Outlet } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalState, principalState } from '../App';
import { ACCOUNT, LOGIN, LOGOUT, SIGNUP } from '../utility/constants';

export default function Layout() {
  const setModal = useSetRecoilState(modalState);
  const principal = useRecoilValue(principalState);

  return (
    <>
      <nav className='flex justify-between content-center bg-blue-600 text-white shadow-md px-8 py-2'>
        <div className='flex items-center gap-2'>
          <Link className='text-4xl' to='/'>
            Composite Care
          </Link>
          <HeartIcon className='h-8 w-8 text-rose-100' />
        </div>

        {principal ? (
          <div className='flex gap-10'>
            <button
              className='place-self-center'
              onClick={() => setModal(ACCOUNT)}
            >
              Account
            </button>
            <button
              className='place-self-center'
              onClick={() => setModal(LOGOUT)}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex gap-10'>
            <button
              className='place-self-center'
              onClick={() => setModal(LOGIN)}
            >
              Login
            </button>
            <button
              className='place-self-center'
              onClick={() => setModal(SIGNUP)}
            >
              Signup
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}
