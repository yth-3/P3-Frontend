// import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

// import { modalState } from '../../App';
import LargeButton from '../../components/ui/LargeButton';

export default function AdminDashboardPage() {
    // const setModal = useSetRecoilState(modalState);
    const navigate = useNavigate();

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header id="landing-header" className='text-lg flex flex-col items-center pt-8'>
                <div
                    id="header-copy"
                    className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
                >
                    <h2 className='text-6xl'>Admin Dashboard</h2>
                    <div>Welcome!</div>
                    <section className='flex flex-row gap-5 justify-center text-lg'>
                        <LargeButton onClick={() => navigate("/")}>View all users</LargeButton>
                        <LargeButton onClick={() => navigate("/")}>Activate/inactivate user</LargeButton>
                    </section>
                </div>
            </header>
        </main>
    )
}
