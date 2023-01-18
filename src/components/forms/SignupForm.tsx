import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../App';
import { backendApi } from '../../utility/api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { LOGIN } from '../../utility/constants';
import LargeButton from '../ui/LargeButton';

type Props = {
  setLoading: Function;
  isLoading: boolean;
  setAccountCreated: Function;
};

export default function SignupForm({
  setLoading,
  isLoading,
  setAccountCreated,
}: Props) {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const setModal = useSetRecoilState(modalState);
  const [isPwVisible, setPwVisible] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!username.match(/^[a-z0-9_-]{3,20}$/g)) {
      setError(
        'Username must be 3 to 20 characters long, and may contain only letters, numbers, "_", and "-"'
      );
      return;
    }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
      )
    ) {
      setError('Invalid email');
      return;
    }

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
      .post('users', {
        username,
        password: password1,
        email,
      })
      .then((response) => {
        setError('');
        if (response.status === 201) setAccountCreated(true);
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
        <h2 className='text-3xl text-center'>Signup</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => handleChange(setUsername, e.target.value)}
        />
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => handleChange(setEmail, e.target.value)}
        />
        <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
          <input
            className='bg-gray-100 rounded-md px-5 py-2'
            type={isPwVisible ? 'text' : 'password'}
            placeholder='Password'
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
          Create an account
        </button>
        <div className='w-64'>
          <p className='whitespace-normal text-center text-red-600'>{error}</p>
        </div>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        Already a member?
        <LargeButton onClick={() => setModal(LOGIN)}>Log in</LargeButton>
      </section>
    </form>
  );
}
