import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';

export default function InsurerDashboardPage() {
    const setModal = useSetRecoilState(modalState);

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header id="landing-header" className='text-lg flex flex-col items-center pt-8'>
                <div
                    id="header-copy"
                    className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
                >
                    <h2 className='text-6xl'>Dashboard</h2>
                    <div>Welcome!</div>
                </div>
            </header>

            <section className='flex gap-1 items-center text-lg'>
                <LargeButton onClick={() => setModal('login')}>Log out</LargeButton>
            </section>
            
        </main>
    )
}
