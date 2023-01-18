import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { principalState } from '../../App';
import Spinner from '../../components/ui/Spinner';
import { backendApi } from '../../utility/api';

const options = ['Medication', 'Consultation', 'Procedure'];

type Props = {
  onFinish: Function;
};
export default function NewClaim({ onFinish }: Props) {
  const principal = useRecoilValue(principalState);
  const [loading, setLoading] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState('');
  const [claimType, setClaimType] = useState<string | undefined>();
  const [description, setDescription] = useState('');

  function disableAdd() {
    return !(
      description &&
      claimType &&
      claimedAmount &&
      claimedAmount !== '0'
    );
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isNaN(Number(e.target.value))) {
      setClaimedAmount(e.target.value);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    backendApi
      .post(
        '/claims',
        {
          claimedAmount,
          claimType: claimType?.toUpperCase(),
          description,
        },
        {
          headers: {
            authorization: principal?.token,
          },
        }
      )
      .then((response) => {})
      .catch((error) => console.error(error));
  }

  return (
    <div className='flex flex-col'>
      <h3 className='text-3xl text-blue-900 mx-auto'>New Claim</h3>
      {loading ? (
        <Spinner />
      ) : (
        <form
          className='flex flex-col gap-4 text-lg mt-5'
          onSubmit={handleSubmit}
        >
          <label className='flex gap-1 items-center w-full'>
            $
            <input
              className='bg-gray-100 shadow-inner rounded-md px-5 py-2 w-full'
              type='text'
              placeholder='Amount'
              value={claimedAmount}
              onChange={handleAmountChange}
            />
          </label>
          <label className='flex justify-between items-center gap-1 w-full'>
            What is this claim for?
            <select
              onChange={(e) => setClaimType(e.target.value)}
              placeholder='Type'
              className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
            >
              <option></option>
              {options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </label>
          <label>Please include any relevant details</label>
          <textarea
            className='bg-gray-100 shadow-inner p-3'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            disabled={disableAdd()}
            className='bg-green-500 hover:bg-green-400 p-3 rounded-sm text-slate-50 disabled:bg-gray-300'
          >
            File Claim
          </button>
        </form>
      )}
    </div>
  );
}
