import { FormEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { claimState, principalState } from '../../App';
import Spinner from '../../components/ui/Spinner';
import { backendApi } from '../../utility/api';

type Props = {
  onFinish: Function;
};
export default function FindClaim({ onFinish }: Props) {
  const [claimId, setClaimId] = useState('');
  const [error, setError] = useState('');
  const setClaim = useSetRecoilState(claimState);
  const principal = useRecoilValue(principalState);
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    backendApi
      .get(`claims/id?id=${claimId}`, {
        headers: {
          authorization: principal?.token,
        },
      })
      .then((response) => {
        if (!response.data.claimId) setError('Claim not found');
        else {
          setError('');
          setClaim(response.data);
          onFinish();
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className='flex flex-col gap-5'>
      <h3 className='text-3xl text-blue-900 mx-auto'>Find Claim</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 justify-center'
        >
          <main className='flex flex-col gap-5'>
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

          <section className='flex justify-center items-center text-lg'>
            {error && <p className='text-red-600'>{error}</p>}
          </section>
        </form>
      )}
    </div>
  );
}
