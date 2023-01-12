import { useState } from 'react';

const options = ['Medication', 'Consultation', 'Procedure'];

export default function NewClaim() {
  const [amount, setAmount] = useState<number | string>();
  const [type, setType] = useState<string | undefined>();
  const [description, setDescription] = useState('');

  function disableAdd() {
    return !(description && type && amount);
  }

  return (
    <div className='flex flex-col'>
      <h3 className='text-3xl text-blue-900 mx-auto'>New Claim</h3>
      <form className='flex flex-col gap-4 text-lg mt-5'>
        <label className='flex gap-1 items-center w-full'>
          $
          <input
            className='bg-gray-100 shadow-inner rounded-md px-5 py-2 w-full'
            type='text'
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className='flex justify-between items-center gap-1 w-full'>
          What is this claim for?
          <select
            onChange={(e) => setType(e.target.value)}
            className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
          >
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
          className='bg-gray-100 shadow-inner'
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
    </div>
  );
}
