import { FormEvent, useContext, useState } from 'react';
import LargeLink from '../components/ui/LargeLink';

export default function LoginPage() {
  const [username, setUsername]= useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function submit(e: FormEvent) {
    e.preventDefault();

    setError("");

    setUsername("");
    setPassword("");
  }
  
  return (
  <form onSubmit={(e) => submit(e)} className='flex justify-center'>
    <div className='flex flex-col gap-10 shadow-xl rounded-xl mt-40 px-10 py-16'>
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Login</h2>
        <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Log in</button>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        { error && <p className='text-red-600'>{error}</p> }
        or
        <LargeLink to={'/signup'}>Create an Account</LargeLink>
      </section>
    </div>
  </form>
 )
}
