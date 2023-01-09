import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';
import { SIGN_UP } from '../utility/constants';

export default function Login() {
  const [username, setUsername]= useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const setModal = useSetRecoilState(modalState);

  async function submit(e: FormEvent) {
    e.preventDefault();

    setError("");

    setUsername("");
    setPassword("");
  }
  
  return (
    <form onSubmit={(e) => submit(e)} className='flex flex-col gap-10 justify-center'>
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Login</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text' placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Log in</button>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        { error && <p className='text-red-600'>{error}</p> }
        or
        <LargeButton onClick={() => setModal(SIGN_UP)}>Create an account</LargeButton>
      </section>
    </form>
  )
}
