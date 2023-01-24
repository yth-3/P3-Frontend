import { useState } from 'react';

import ChangeUsernameForm from '../components/forms/ChangeUsernameForm';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import LargeButton from '../components/ui/LargeButton';
import Spinner from '../components/ui/Spinner';

export default function AccountSettings() {
  const [isLoading, setLoading] = useState(false);
  const [accountChanged, setAccountChanged] = useState('');
  const [showForm, setShowForm] = useState('');

  function handleButtonClick(formType: string) {
    setShowForm(formType);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {showForm === '' ? (
        <main className='flex flex-col gap-5'>
          <h2 className='text-3xl text-center'>Account Settings</h2>
          <LargeButton onClick={() => handleButtonClick('username')}>
            Change username
          </LargeButton>
          <LargeButton onClick={() => handleButtonClick('password')}>
            Change password
          </LargeButton>
        </main>
      ) : showForm === 'username' ? (
        <ChangeUsernameForm
          setLoading={setLoading}
          isLoading={isLoading}
          setShowForm={setShowForm}
          setAccountChanged={setAccountChanged}
        />
      ) : (
        showForm === 'password' && (
          <ChangePasswordForm
            setLoading={setLoading}
            isLoading={isLoading}
            setShowForm={setShowForm}
            setAccountChanged={setAccountChanged}
          />
        )
      )}
      {accountChanged !== '' && (
        <div className='flex justify-center pt-5 text-blue-600 font-bold'>
          {showForm === '' && accountChanged}
        </div>
      )}
    </>
  );
}
