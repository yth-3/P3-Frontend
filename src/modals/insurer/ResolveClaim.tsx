import { FormEvent, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { claimState } from '../../App';
import { ApproveButton, DenyButton } from '../../components/ui/ResolveButton';
//import { backendApi } from '../../utility/api';

type Props = {
  onClose: Function;
};

export default function ResolveClaim({ onClose }: Props) {
  const claim = useRecoilValue(claimState);
  const [isSettling, setSettling] = useState(false);
  const [settled, setSettled] = useState<number | string>('');
  const [selectedOption, setSelectedOption] = useState('option1');

  //const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
  }

  async function settle(e: FormEvent) {
    e.preventDefault();
    setSettling(true);
  }

  function handleResolve(status: string) {
    if (status === 'Approved') {
      console.log('approved');
      onClose();

      /*backendApi
        .put(`claims/approve/${claim?.id}`)
        .then((response) => {
          setError('');
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });*/
    } else if (status === 'Denied') {
      console.log('denied');
      onClose();

      /*backendApi
        .put(`claims/deny/${claim?.id}`)
        .then((response) => {
          setError('');
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });*/
    }
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isNaN(Number(e.target.value))) {
      setSettled(e.target.value);
    }
  }

  return (
    <form onSubmit={(e) => submit(e)}>
      {claim && (
        <div>
          <h3>
            <strong>Claim ID:</strong> {claim?.id}
          </h3>
          <h3>
            <strong>Submitter ID:</strong> {claim?.submitterId}
          </h3>
          <h3>
            <strong>Date submitted:</strong> {claim?.submitted.toUTCString()}
          </h3>
          <h3>
            <strong>Amount claimed:</strong> ${claim?.claimed.toFixed(2)}
          </h3>
          <h3>
            <strong>Claim type:</strong> {claim?.type}
          </h3>
          <h3>
            <strong>Claim description:</strong> {claim?.description}
          </h3>
          <h3>
            <strong>Claim status:</strong> {claim?.status}
          </h3>
          {claim?.receipt && (
            <h3>
              <strong>Claim receipt:</strong> {claim?.receipt}
            </h3>
          )}
          {claim?.resolverId ? (
            <>
              <h3>
                <strong>Resolver ID:</strong> {claim?.resolverId}
              </h3>
              <h3>
                <strong>Date resolved:</strong> {claim?.resolved?.toUTCString()}
              </h3>
              <h3>
                <strong>Amount settled:</strong> ${claim?.settled?.toFixed(2)}
              </h3>
            </>
          ) : (
            <section className='flex flex-col'>
              <h3 className='text-blue-600 font-bold text-center py-5'>
                Once this claim has been resolved, its status cannot be changed.
              </h3>
              {isSettling && (
                <>
                  <h3>
                    <strong>Amount settled</strong>
                  </h3>
                  <div className='flex flex-col gap-5 py-5'>
                    <div className='radio'>
                      <label className='flex flex-row items-center gap-5'>
                        <input
                          type='radio'
                          name='react-tips'
                          value='option1'
                          checked={selectedOption === 'option1'}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className='form-check-input'
                        />
                        Full amount: ${claim?.claimed?.toFixed(2)}
                      </label>
                    </div>
                    <div className='radio'>
                      <label className='flex flex-row items-center gap-5'>
                        <input
                          type='radio'
                          name='react-tips'
                          value='option2'
                          checked={selectedOption === 'option2'}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className='form-check-input'
                        />
                        Other amount: $
                        <input
                          disabled={selectedOption === 'option2' ? false : true}
                          className='bg-gray-100 shadow-inner rounded-md px-5 py-2 disabled:bg-gray-300'
                          type='text'
                          placeholder='Amount'
                          value={settled}
                          onChange={handleAmountChange}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
              <div className='flex flex-row justify-center gap-5'>
                {isSettling ? (
                  <>
                    <ApproveButton onClick={() => handleResolve('Approved')} />
                    <button
                      className='text-blue-600 hover:text-blue-500 hover:underline'
                      onClick={() => setSettling(false)}
                    >
                      Go back
                    </button>
                  </>
                ) : (
                  <>
                    <ApproveButton onClick={(e: FormEvent) => settle(e)} />
                    <DenyButton onClick={() => handleResolve('Denied')} />
                  </>
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </form>
  );
}
