import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import './LandingPage.css';
import LargeButton from '../components/ui/LargeButton';
import InformationCard from '../components/landing_page/InformationCard';

const information = [
  {
    header: 'Manage your Schedule',
    information: 'Staff can easily setup scheduling for you'
  },
  {
    header: 'File a claim',
    information: 'Easily file a claim',
  },
  {
    header: 'Nutrition',
    information: 'Use our nutrition calculator to see how your diet is improving your health',
  },
];

export default function LandingPage() {
  const setModal = useSetRecoilState(modalState);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <header id="landing-header" className='text-lg flex flex-col items-center pt-8'>
        <div
          id="header-copy"
          className='bg-slate-50 opacity-90 w-fit p-4 rounded-lg text-2xl gap-6 flex flex-col text-blue-800'
        >
          <h2 className='text-6xl'>Welcome to Composite Care</h2>
          <div>Composite Cares about every aspect of your health</div>
          <div>From scheduling to filing claims, we make it easy</div>
        </div>
      </header>
      
      <section className='flex gap-1 items-center text-lg'>
        Already a member?
        <LargeButton onClick={() => setModal('login')}>Login</LargeButton>
        or 
        <LargeButton onClick={() => setModal('signup')}>Create an Account</LargeButton>
      </section>

      <section className='flex justify-around gap-4'>
        {information.map(info => {
          return <InformationCard
                    key={info.header}
                    header={info.header}
                    information={info.information}
                  />
        })}
      </section>
    </main>
  )
}
