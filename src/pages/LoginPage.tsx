import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername]= useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();

    setUsername("");
    setPassword("");
  }
  
  return (
    <form onSubmit={(e) => submit(e)} className='flex justify-center'>
      <div className='flex flex-col items-center gap-7 shadow-xl rounded-xl mt-40 px-10 py-16'>
        <h1 className='text-3xl'>Login</h1>
        <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className='bg-blue-600 rounded-md text-white mt-2 px-5 py-2 ease-out duration-300 hover:scale-110'>Log in</button>

        { error ? <p className='text-red-600'>{error}</p> : null  }
        Not a member?
        <Link to={'/signup'} className='text-blue-600 underline'>Create Account</Link>
      </div>
    </form>
 )
}
