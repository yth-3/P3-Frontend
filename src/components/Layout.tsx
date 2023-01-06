import { Link, Outlet } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Layout() {
  return (
    <>
      <nav className='flex justify-between content-center bg-blue-600 text-white shadow-md px-8 py-2'>
        <div className='flex items-center gap-2'>
          <Link className='text-4xl' to="/">Composite Care</Link>
          <HeartIcon className="h-8 w-8 text-rose-100"/>
        </div>
        <Link className='place-self-center' to="/login">Login</Link>
      </nav>
      <Outlet />
    </>
  )
}
