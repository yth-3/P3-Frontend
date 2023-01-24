import { useState } from 'react';

import {
  ChangeUsernameForm,
  ChangePasswordForm,
} from '../components/forms/AccountSettingsForms';
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
      {accountChanged !== '' && <div>{accountChanged}</div>}
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
    </>
  );
}
