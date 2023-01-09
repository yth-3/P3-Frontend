import LargeLink from '../../components/ui/LargeLink';

export default function PatientDashboardPage() {

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header className='flex flex-col items-center pt-8'>
              <h2 className='text-4xl'>Welcome, [USERS NAME HERE]!</h2>
            </header>

            <section className='flex gap-4'>
              <LargeLink to="claims/new">New Claim</LargeLink>
              <LargeLink to="claims">View Claims</LargeLink>
            </section>
        </main>
    )
}
