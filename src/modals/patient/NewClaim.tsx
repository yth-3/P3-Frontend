import { useState } from 'react';

const options = ['Medication', 'Consultation', 'Procedure'];

export default function NewClaim() {
  const [amount, setAmount] = useState<number | string>();

  return (
    <>
      <h3 className='text-2xl'>New Claim</h3>
      <form className='flex flex-col gap-4'>
        <label>
          Amount:
          <input
            className='bg-gray-100 shadow-inner rounded-md px-5 py-2'
            type='number'
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Type:
          <select className='bg-gray-100 shadow rounded-md px-5 py-2'>
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </label>
        <label>
          Description
          <textarea className='bg-slate-100 shadow-inner' value='' />
        </label>
        <button className='bg-green-500 hover:bg-green-400 p-3 rounded-sm text-slate-50'>
          Add
        </button>
      </form>
    </>
  );
}
