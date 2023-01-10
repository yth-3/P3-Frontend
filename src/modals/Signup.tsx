import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';
import { LOGIN } from '../utility/constants';
import { backendApi } from '../utility/api';

export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [accountCreated, setAccountCreated] = useState(false);
    const setModal = useSetRecoilState(modalState);

    async function submit(e: FormEvent) {
        e.preventDefault();
        if (password1 !== password2) {
          setError('Passwords do not match');
          return;
        }

        backendApi.post('users', {
          username,
          password: password1,
          email
        }).then(resp => {
          if (resp.status === 201) {
            setAccountCreated(true);
          }
        }).catch(error => {
          setError(error);
        })
    }
    
    return (
      <div>
        {
          accountCreated ?
            <>
              <div>Success</div>
              <LargeButton onClick={() => setModal(LOGIN)}>Login Now</LargeButton>
            </>
          :
            <form onSubmit={(e) => submit(e)} className='flex flex-col gap-10 justify-center'>
              <main className='flex flex-col gap-5'>
                  <h2 className='text-3xl text-center'>Signup</h2>
                  <input
                      className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
                      type='text'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                      className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
                      type='text'
                      placeholder='Password'
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                  />
                  <input
                      className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
                      type={'text'}
                      placeholder='Confirm Password'
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                  />
                  <input
                      className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
                      type='text'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Create an account</button>
              </main>
              
              <section className='flex gap-1 justify-center items-center text-lg'>
                  { error && <p className='text-red-600'>{error}</p> }
                  Already a member?
                  <LargeButton onClick={() => setModal(LOGIN)}>Log in</LargeButton>
              </section>
            </form>
        }
      </div>
    )
}
