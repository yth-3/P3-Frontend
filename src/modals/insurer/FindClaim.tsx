import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { claimState } from '../../App';
import InlineModal from '../../components/InlineModal';
import { Claim } from '../../utility/types';
import ResolveClaim from './ResolveClaim';

export default function FindClaim() {
  const [id, setId]= useState<string>("");
  const [error, setError] = useState<string>("");
  const setClaim = useSetRecoilState(claimState);
  const [setshowResolve, setShowResolve] = useState(false);

  function handleDetailsClick(id: string) {
    setShowResolve(true);

    const claim: Claim = {
        id: id,
        submitterId: '12345',
        submitted: new Date(),
        claimed: 123,
        type: '12345',
        description: '12345',
        status: 'PENDING'
    }

    setClaim(claim);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    setError("");

    setId("");
  }
  
  return (
    <form onSubmit={(e) => submit(e)} className='flex flex-col gap-10 justify-center'>
      <main className='flex flex-col gap-5'>
        <h2 className='text-3xl text-center'>Find claim</h2>
        <input
          className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          type='text'
          placeholder='Claim ID'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
            className='bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-lg text-slate-50'
            onClick={() => handleDetailsClick(id)}
        >
            Resolve claim
        </button>
      </main>

      <section className='flex gap-1 justify-center items-center text-lg'>
        { error && <p className='text-red-600'>{error}</p> }
      </section>
      {setshowResolve &&
        <InlineModal onClose={() => setShowResolve(false)}>
          <ResolveClaim />
        </InlineModal>
      }
    </form>
  )
}
