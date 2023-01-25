import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import './AdminDashboardPage.css';
import LargeButton from '../../components/ui/LargeButton';
import { principalState } from '../../App';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const principal = useRecoilValue(principalState);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <header
        id='admin-header'
        className='text-lg flex flex-col items-center pt-8'
      >
        <div
          id='header-copy'
          className='bg-slate-50 opacity-90 w-1/2 p-4 rounded-lg gap-4 flex flex-col text-blue-800'
        >
          <h2 className='text-4xl'>Welcome, {principal?.username}</h2>
          <h2>This is your dashboard.</h2>
          <h2>
            As an administrator, you can view all users that have registered
            with the system. From here you can also create an account for an
            insurer or staff member.
          </h2>
        </div>
      </header>

      <section className='flex flex-row gap-5 justify-center text-lg'>
        <LargeButton onClick={() => navigate('/admin/users')}>
          View all users
        </LargeButton>
        <LargeButton onClick={() => navigate('/admin/add')}>
          Add new Insurer/Staff member
        </LargeButton>
      </section>
    </main>
  );
}
