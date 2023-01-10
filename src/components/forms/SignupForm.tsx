import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../App";
import { backendApi } from "../../utility/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { LOGIN } from "../../utility/constants";
import LargeButton from "../ui/LargeButton"

type Props = {
  setLoading: Function;
  setAccountCreated: Function;
}

export default function SignupForm({setLoading, setAccountCreated}: Props) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const setModal = useSetRecoilState(modalState);
  const [isPwVisible, setPwVisible] = useState(false);

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
      console.log(resp);

      if (resp.status === 201)
        setAccountCreated(true);

      setLoading(false);
    }).catch(error => {
      setError(error);
    })

    setLoading(true);
  }

  return (
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
        {}
        <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
          <input
            className='bg-gray-100 rounded-md px-5 py-2'
            type={
                isPwVisible ?
                  'text'
                :
                  'password'
            }
            placeholder='Password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <>
            {
              isPwVisible ?
                <EyeSlashIcon
                  className='h-10 w-10 px-2'
                  onClick={() => setPwVisible(false)}
                />
              :
                <EyeIcon
                  className='h-10 w-10 px-2'
                  onClick={() => setPwVisible(true)}
                />
            }
          </>
        </div>
        {
          password1 &&
            <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
              <input
                className='bg-gray-100 rounded-md px-5 py-2'
                type={
                    isPwVisible ?
                      'text'
                    :
                      'password'
                }
                placeholder='Confim Password'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <>
                {
                  isPwVisible ?
                    <EyeSlashIcon
                      className='h-10 w-10 px-2'
                      onClick={() => setPwVisible(false)}
                    />
                  :
                    <EyeIcon
                      className='h-10 w-10 px-2'
                      onClick={() => setPwVisible(true)}
                    />
                }
              </>
          </div>
        }
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Create an account</button>
        { error && <p className='flex justify-center text-red-600'>{error}</p> }
      </main>
        
      <section className='flex gap-1 justify-center items-center text-lg'>
        Already a member?
        <LargeButton onClick={() => setModal(LOGIN)}>Log in</LargeButton>
      </section>
    </form>
  )
}
