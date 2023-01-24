import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { principalState } from '../../App';
import { backendApi } from '../../utility/api';
import { EMAIL_REGEX, PW_REGEX, UNAME_REGEX } from '../../utility/constants';
import InlineModal from '../InlineModal';

export default function AddUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [pwVisible, setPwVisible] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showCreated, setShowCreated] = useState(false);

  const principal = useRecoilValue(principalState);

  return (
    <form
      className='flex flex-col gap-10 justify-center'
      onSubmit={(e) => submit(e)}
    >
      <main className='flex flex-col gap 5'>
        <h2 className='text-3xl text-center'>Add New User</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2 margin-bottom: 10px'
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
        <select
          name={role}
          id='role'
          value={role}
          onChange={(e) => handleChange(setRole, e.target.value)}
        >
          <option hidden id='default' value=''>
            Select a Role
          </option>
          <option value='insurer'>Insurer</option>
          <option value='staff'>Staff</option>
        </select>
        <div className='flex flex-row items-center bg-gray-100 shadow-inner rounded-md'>
          <input
            className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
            type={pwVisible ? 'text' : 'password'}
            placeholder='Password'
            value={password1}
            onChange={(e) => handleChange(setPassword1, e.target.value)}
          />
          <>
            {pwVisible ? (
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
              className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
              type={pwVisible ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={password2}
              onChange={(e) => handleChange(setPassword2, e.target.value)}
            />
            <>
              {pwVisible ? (
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
        <button className='bg-blue-600 hover:bg-blue-500 p3 rounded-sm text-lg text-slate-50'>
          Submit
        </button>
        <div className='w-64'>
          <p className='whitespace-normal text-center text-red-600'>{error}</p>
        </div>
        {showCreated && (
          <InlineModal onClose={() => setShowCreated(false)}>
            Account created successfully
          </InlineModal>
        )}
      </main>
    </form>
  );

  function handleChange(
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) {
    setter(value);
    setError('');
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!username.match(UNAME_REGEX)) {
      setError(
        'Username must be 3 to 20 characters long, and may contain only letters, numbers, "_", and "-"'
      );
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setError('Invalid email');
      return;
    }

    if (role !== 'insurer' && role !== 'staff') {
      setError('Please select a role');
      return;
    }

    if (!password1.match(PW_REGEX)) {
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
      .post(
        `/users/${role}`,
        {
          username,
          password: password1,
          email,
        },
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then((response) => {
        setError('');
        if (response.status === 201) {
          console.log('success');
          setUsername('');
          setEmail('');
          setRole('');
          setPassword2('');
          setPassword1('');
          setShowCreated(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }
}
