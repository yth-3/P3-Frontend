import { FormEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { claimState, principalState } from '../../App';
import { backendApi } from '../../utility/api';

type Props = {
  onFinish: Function;
};
export default function FindClaim({ onFinish }: Props) {
  const [claimId, setClaimId] = useState('');
  const [error, setError] = useState('');
  const setClaim = useSetRecoilState(claimState);
  const principal = useRecoilValue(principalState);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    backendApi
      .get(`claims/id?id=${claimId}`, {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        setError('');
        setClaim(response.data);
        onFinish();
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-10 justify-center'
    >
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Find Claim</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Claim ID'
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
        />
        <button className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'>
          Resolve Claim
        </button>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        {error && <p className='text-red-600'>Claim not found</p>}
      </section>
    </form>
  );
}
