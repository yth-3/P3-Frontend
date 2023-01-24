import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { principalState } from '../../App';
import { backendApi } from '../../utility/api';
import LargeButton from '../ui/LargeButton';
import { PW_REGEX } from '../../utility/constants';
import PwEyeIcon from '../ui/PwEyeIcon';

type Props = {
  setLoading: Function;
  isLoading: boolean;
  setShowForm: Function;
  setAccountChanged: Function;
};

export default function ChangePasswordForm({
  setLoading,
  isLoading,
  setShowForm,
  setAccountChanged,
}: Props) {
  const principal = useRecoilValue(principalState);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [isPwVisible, setPwVisible] = useState(false);

  async function submitPassword(e: FormEvent) {
    e.preventDefault();

    if (!password1.match(PW_REGEX)) {
      setError(
        'Password must be minimum 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
      );
      return;
    }

    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    backendApi
      .put(
        'users/password',
        {
          password: password1,
        },
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then((response) => {
        setError('');
        if (response.status === 202) {
          setShowForm('');
          setAccountChanged('Password changed');
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  function handleChange(
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) {
    setter(value);
    setError('');
  }

  function handleButtonClick(formType: string) {
    setShowForm(formType);
  }

  return (
    <form
      onSubmit={(e) => submitPassword(e)}
      className={`${isLoading && 'hidden'} flex flex-col gap-10 justify-center`}
    >
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Change Password</h2>
        <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
          <input
            className='bg-gray-100 rounded-md px-5 py-2'
            type={isPwVisible ? 'text' : 'password'}
            placeholder='New Password'
            value={password1}
            onChange={(e) => handleChange(setPassword1, e.target.value)}
          />
          <PwEyeIcon isPwVisible={isPwVisible} setPwVisible={setPwVisible} />
        </div>
        {(password1 || password2) && (
          <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
            <input
              className='bg-gray-100 rounded-md px-5 py-2'
              type={isPwVisible ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={password2}
              onChange={(e) => handleChange(setPassword2, e.target.value)}
            />
            <>
              {isPwVisible ? (
                <EyeSlashIcon
                  className='hover:bg-gray-200 rounded-md h-10 w-10 px-2 cursor-pointer'
                  onClick={() => setPwVisible(false)}
                />
              ) : (
                <EyeIcon
                  className='hover:bg-gray-200 rounded-md h-10 w-10 px-2 cursor-pointer'
                  onClick={() => setPwVisible(true)}
                />
              )}
            </>
          </div>
        )}
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>
          Submit
        </button>
        <div className='w-64'>
          <p className='whitespace-normal text-center text-red-600'>{error}</p>
        </div>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        <LargeButton onClick={() => handleButtonClick('username')}>
          Change username
        </LargeButton>
      </section>
    </form>
  );
}
