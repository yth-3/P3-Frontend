import { Link } from 'react-router-dom';

export default function PatientDashboardPage() {

    return (
        <main className='flex flex-col gap-10 items-center'>
            <header className='text-lg flex flex-col items-center pt-8'>
              <h2>Welcome, [USERS NAME HERE]!</h2>
            </header>

            <section>
              <button>File Claim</button>
              <Link to="/claims">Manage Claims</Link>
            </section>
        </main>
    )
}
