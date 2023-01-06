import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';
import LogoutButton from '../components/ui/LogoutButton';

export default function InsurerDashboardPage() {
    const setModal = useSetRecoilState(modalState);
    const navigate = useNavigate();

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header id="landing-header" className='text-lg flex flex-col items-center pt-8'>
                <div
                    id="header-copy"
                    className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
                >
                    <h2 className='text-6xl'>Insurer Dashboard</h2>
                    <div>Welcome!</div>
                    <section className='flex flex-row gap-5 justify-center text-lg'>
                        <LargeButton onClick={() => navigate("/")}>View claims</LargeButton>
                        <LargeButton onClick={() => navigate("/")}>Approve/deny claim</LargeButton>
                    </section>
                </div>
            </header>

            <section className='flex gap-1 items-center text-lg'>
                <LogoutButton onClick={() => setModal('logout')}>Log out</LogoutButton>
            </section>
            
        </main>
    )
}
