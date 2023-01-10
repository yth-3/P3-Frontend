import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { modalState } from '../../App';
import './InsurerDashboardPage.css';
import LargeButton from '../../components/ui/LargeButton';
import { FIND_PATIENT_CLAIM } from '../../utility/constants';

export default function InsurerDashboardPage() {
    const setModal = useSetRecoilState(modalState);
    const navigate = useNavigate();

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header id="insurer-header" className='text-lg flex flex-col items-center pt-8'>
                <div
                    id="header-copy"
                    className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
                >
                    <h2 className='text-6xl'>Insurer Dashboard</h2>
                    <div>Welcome!</div>
                </div>
            </header>

            <section className='flex flex-row gap-5 items-center text-lg'>
                Actions:
                <LargeButton onClick={() => navigate("claims")}>Manage claims</LargeButton>
                <LargeButton onClick={() => setModal(FIND_PATIENT_CLAIM)}>Resolve claim</LargeButton>
            </section>
        </main>
    )
}
