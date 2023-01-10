import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { modalState, principalState } from '../../App';
import LargeButton from '../../components/ui/LargeButton';
import { SIGNUP } from '../../utility/constants';
import { backendApi } from '../../utility/api';

type Props = {
    setLoading: Function;
}

export default function LoginForm({setLoading}: Props) {
    const [username, setUsername]= useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const setModal = useSetRecoilState(modalState);
    const setPrincipal = useSetRecoilState(principalState);
    const navigate = useNavigate();
    const [isPwVisible, setPwVisible] = useState(false);

    async function submit(e: FormEvent) {
        e.preventDefault();
    
        backendApi.post('auth', { username, password })
            .then(resp => {
                console.log(resp);
                setPrincipal(resp.data);
                setModal(null);
                navigate('/patient');
                setLoading(false);
            }).catch(err => {
                console.log('error', err);
            });
        
        setLoading(true);
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>Log in</button>
            </main>

            <section className='flex gap-1 justify-center items-center text-lg'>
                { error && <p className='text-red-600'>{error}</p> }
                or
                <LargeButton onClick={() => setModal(SIGNUP)}>Create an account</LargeButton>
            </section>
        </form>
    )
}
