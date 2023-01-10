import { principalState } from '../../App';
import LargeLink from '../../components/ui/LargeLink';
import { useRecoilValue } from 'recoil';

export default function PatientDashboardPage() {
    const principal= useRecoilValue(principalState);

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header className='flex flex-col items-center pt-8'>
              <h2 className='text-4xl'>Welcome, {principal?.username}!</h2>
            </header>

            <section className='flex gap-4'>
              <LargeLink to="claims/new">New Claim</LargeLink>
              <LargeLink to="claims">View Claims</LargeLink>
            </section>
        </main>
    )
}
