import { FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

import { principalState } from '../../App';
import { backendApi } from '../../utility/api';
import LargeButton from '../ui/LargeButton';
import { UNAME_REGEX } from '../../utility/constants';

type Props = {
  setLoading: Function;
  isLoading: boolean;
  setShowForm: Function;
  setAccountChanged: Function;
};

export default function ChangeUsernameForm({
  setLoading,
  isLoading,
  setShowForm,
  setAccountChanged,
}: Props) {
  const [principal, setPrincipal] = useRecoilState(principalState);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!username.match(UNAME_REGEX)) {
      setError(
        'Username must be 3 to 20 characters long, and may contain only letters, numbers, "_", and "-"'
      );
      return;
    }

    backendApi
      .put(
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
        if (response.status === 202) {
          setPrincipal({
            ...principal!,
            username: username,
          });
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

  function handleButtonClick(formType: string) {
    setShowForm(formType);
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
        <LargeButton onClick={() => handleButtonClick('password')}>
          Change password
        </LargeButton>
      </section>
    </form>
  );
}
