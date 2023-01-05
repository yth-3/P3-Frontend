import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className='flex justify-between'>
        <Link className='text-blue-600 text-4xl' to="/">Composite Care</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main className='mx-auto'>
        <Outlet />
      </main>
    </>
  )
}
