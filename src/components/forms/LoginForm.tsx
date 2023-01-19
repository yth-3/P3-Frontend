import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { modalState, principalState } from '../../App';
import LargeButton from '../../components/ui/LargeButton';
import { PRINCIPAL, SIGNUP } from '../../utility/constants';
import { backendApi } from '../../utility/api';

type Props = {
  setLoading: Function;
  isLoading: boolean;
};

export default function LoginForm({ setLoading, isLoading }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const setPrincipal = useSetRecoilState(principalState);
  const navigate = useNavigate();
  const [isPwVisible, setPwVisible] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    backendApi
      .post('auth', { username, password })
      .then((response) => {
        setError(false);
        setPrincipal(response.data);
        localStorage.setItem(PRINCIPAL, JSON.stringify(response.data));
        setModal(null);
        navigate('/patient');
      })
      .catch((error) => {
        setError(true);
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
    setError(false);
  }

  return (
    <form
      onSubmit={(e) => submit(e)}
      className={`${isLoading && 'hidden'} flex flex-col gap-10 justify-center`}
    >
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Login</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => handleChange(setUsername, e.target.value)}
        />
        <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
          <input
            className='bg-gray-100 rounded-md px-5 py-2'
            type={isPwVisible ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
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
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>
          Log in
        </button>
        <div className='h-0'>
          {error && (
            <p className='text-center text-red-600'>
              Username or password is incorrect
            </p>
          )}
        </div>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        or
        <LargeButton onClick={() => setModal(SIGNUP)}>
          Create an account
        </LargeButton>
      </section>
    </form>
  );
}
