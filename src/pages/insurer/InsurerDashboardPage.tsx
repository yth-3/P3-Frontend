import { principalState } from '../../App';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalState } from '../../App';
import './InsurerDashboardPage.css';
import LargeLink from '../../components/ui/LargeLink';
import LargeButton from '../../components/ui/LargeButton';
import { FIND_PATIENT_CLAIM } from '../../utility/constants';

export default function InsurerDashboardPage() {
    const principal = useRecoilValue(principalState);
    const setModal = useSetRecoilState(modalState);

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header
                id="insurer-header"
                className='flex flex-col items-center pt-8'
            >
                <div
                    id="header-copy"
                    className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
                >
                    <h2 className='text-4xl'>Welcome, {principal?.username}</h2>
                </div>
            </header>

            <section className='flex gap-4'>
                <LargeLink to="claims">Manage claims</LargeLink>
                <LargeButton onClick={() => setModal(FIND_PATIENT_CLAIM)}>Resolve claim</LargeButton>
            </section>
        </main>
    )
}
