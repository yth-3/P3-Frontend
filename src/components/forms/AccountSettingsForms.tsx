import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { principalState } from '../../App';
import { backendApi } from '../../utility/api';
import LargeButton from '../ui/LargeButton';

type Props = {
  setLoading: Function;
  isLoading: boolean;
  setShowForm: Function;
  setAccountChanged: Function;
};

export function ChangeUsernameForm({
  setLoading,
  isLoading,
  setShowForm,
  setAccountChanged,
}: Props) {
  const principal = useRecoilValue(principalState);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!username.match(/^[a-z0-9_-]{3,20}$/g)) {
      setError(
        'Username must be 3 to 20 characters long, and may contain only letters, numbers, "_", and "-"'
      );
      return;
    }

    backendApi
      .post(
        'users/username',
        {
          username,
        },
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then((response) => {
        setError('');
        if (response.status === 201) {
          setShowForm('');
          setAccountChanged('Username changed');
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

  return (
    <form
      onSubmit={(e) => submit(e)}
      className={`${isLoading && 'hidden'} flex flex-col gap-10 justify-center`}
    >
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Change Username</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='New Username'
          value={username}
          onChange={(e) => handleChange(setUsername, e.target.value)}
        />
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>
          Submit
        </button>
        <div className='w-64'>
          <p className='whitespace-normal text-center text-red-600'>{error}</p>
        </div>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        <LargeButton onClick={() => setShowForm('password')}>
          Change password
        </LargeButton>
      </section>
    </form>
  );
}

export function ChangePasswordForm({
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

    if (
      !password1.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g
      )
    ) {
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
        if (response.status === 201) {
          setShowForm('');
          setAccountChanged('Username changed');
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
        <LargeButton onClick={() => setShowForm('username')}>
          Change username
        </LargeButton>
      </section>
    </form>
  );
}
