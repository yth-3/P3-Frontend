import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';
import { LOGIN } from '../utility/constants';
import SignupForm from '../components/forms/SignupForm';
import Spinner from '../components/ui/Spinner';

export default function Signup() {
  const [accountCreated, setAccountCreated] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading && <Spinner />}
      {accountCreated ? (
        <div className='flex flex-col gap-5 justify-center'>
          <div>Account created</div>
          <LargeButton onClick={() => setModal(LOGIN)}>Log in now</LargeButton>
        </div>
      ) : (
        <SignupForm
          setLoading={setLoading}
          isLoading={isLoading}
          setAccountCreated={setAccountCreated}
        />
      )}
    </>
  );
}
