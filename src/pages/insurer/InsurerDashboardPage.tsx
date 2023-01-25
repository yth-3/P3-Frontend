import { principalState } from '../../App';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import './InsurerDashboardPage.css';
import LargeLink from '../../components/ui/LargeLink';
import LargeButton from '../../components/ui/LargeButton';
import InlineModal from '../../components/InlineModal';
import FindClaim from '../../modals/insurer/FindClaim';
import ResolveClaim from '../../modals/insurer/ResolveClaim';
import { useNavigate } from 'react-router-dom';

export default function InsurerDashboardPage() {
  const principal = useRecoilValue(principalState);
  const [showFind, setShowFind] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const navigate = useNavigate();

  function handleFinishFindClaim() {
    setShowFind(false);
    setShowResolve(true);
  }

  function handleFinishResolveClaim() {
    setShowResolve(false);
    navigate('claims');
  }

  return (
    <>
      <main className='flex flex-col gap-10 items-center'>
        <header
          id='insurer-header'
          className='text-lg flex flex-col items-center pt-8'
        >
          <div
            id='header-copy'
            className='bg-slate-50 opacity-90 w-1/2 p-4 rounded-lg gap-4 flex flex-col text-blue-800'
          >
            <h2 className='text-4xl'>Welcome, {principal?.username}</h2>
            <h2>This is your dashboard.</h2>
            <h2>
              As an insurer, you can view and manage all patient claims that
              have been submitted. From here you can also directly resolve a
              claim if you know the claim ID.
            </h2>
          </div>
        </header>

        <section className='flex gap-5 justify-center text-lg'>
          <LargeLink to='claims'>Manage claims</LargeLink>
          <LargeButton onClick={() => setShowFind(true)}>
            Resolve claim
          </LargeButton>
        </section>
      </main>
      {showFind && (
        <InlineModal onClose={() => setShowFind(false)}>
          <FindClaim onFinish={handleFinishFindClaim} />
        </InlineModal>
      )}
      {showResolve && (
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim onFinish={handleFinishResolveClaim} />
        </InlineModal>
      )}
    </>
  );
}
