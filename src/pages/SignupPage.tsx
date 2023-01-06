import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { modalState } from '../App';
import LargeButton from '../components/ui/LargeButton';

export default function SignupPage() {
    const [username, setUsername] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const setModal = useSetRecoilState(modalState);

    async function submit(e: FormEvent) {
        e.preventDefault();

        setError("");

        setUsername("");
        setPassword1("");
        setPassword2("");
        setEmail("");
    }

    return (
        <form onSubmit={(e) => submit(e)} className='flex justify-center'>
            <div className='flex flex-col gap-10 shadow-xl rounded-xl mt-40 px-10 py-16'>
                <main className='flex flex-col gap-5'>
                    <h2 className='text-3xl text-center'>Create an Account</h2>
                    <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Password' value={password1} onChange={(e) => setPassword1(e.target.value)}></input>
                    <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Confirm Password' value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                    <input className='bg-gray-100 shadow-inner rounded-md px-5 py-2' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Submit</button>
                </main>

                <section className='flex gap-1 justify-center items-center text-lg'>
                    { error && <p className='text-red-600'>{error}</p> }
                    Already a member?
                    <LargeButton onClick={() => setModal('login')}>Login</LargeButton>
                </section>
            </div>
        </form>
    )
}