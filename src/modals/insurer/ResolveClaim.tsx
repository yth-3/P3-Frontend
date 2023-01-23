import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { claimState, principalState } from '../../App';
import InlineModal from '../../components/InlineModal';
import {
  SettleButton,
  DenyButton,
  ApproveButton,
} from '../../components/ui/ResolveButton';
import Spinner from '../../components/ui/Spinner';
import { backendApi } from '../../utility/api';
import { User } from '../../utility/types';
import UserInfo from '../admin/UserInfo';

type Props = {
  onFinish: Function;
};
export default function ResolveClaim({ onFinish }: Props) {
  const claim = useRecoilValue(claimState);
  const principal = useRecoilValue(principalState);
  const [isLoading, setLoading] = useState(false);
  const [isSettling, setSettling] = useState(false);
  const [settled, setSettled] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  function handleUserIdClick(user: User | null) {
    if (user) {
      setUser(user);
      setShowUserInfo(true);
    }
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isNaN(Number(e.target.value))) {
      setSettled(e.target.value);
    }
  }

  function handleSettling(e: FormEvent) {
    e.preventDefault();
    setSettling(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (status === 'settled')
      backendApi
        .put(
          `claims/approve/${claim?.claimId}`,
          {
            settled,
          },
          {
            headers: {
              authorization: principal?.token,
            },
          }
        )
        .then(() => onFinish())
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    else if (status === 'denied')
      backendApi
        .put(
          `claims/deny/${claim?.claimId}`,
          {},
          {
            headers: {
              authorization: principal?.token,
            },
          }
        )
        .then(() => onFinish())
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          {claim && (
            <div>
              <h3>
                <strong>Claim ID:</strong> {claim?.claimId}
              </h3>
              <h3 className='flex flex-row gap-1'>
                <strong>Submitter ID:</strong>
                <div
                  className='text-blue-600 hover:text-blue-500 hover:underline cursor-pointer'
                  onClick={() => handleUserIdClick(claim?.submitter)}
                >
                  {claim.submitter.userId}
                </div>
              </h3>
              <h3>
                <strong>Date submitted:</strong>{' '}
                {new Date(claim.submitted).toUTCString()}
              </h3>
              <h3>
                <strong>Amount claimed:</strong> ${claim.claimed.toFixed(2)}
              </h3>
              <h3>
                <strong>Claim type:</strong> {claim.type.type}
              </h3>
              <h3>
                <strong>Claim description:</strong> {claim.description}
              </h3>
              <h3>
                <strong>Claim status:</strong> {claim.status.status}
              </h3>
              {claim.receipt && (
                <h3>
                  <strong>Claim receipt:</strong> {claim.receipt}
                </h3>
              )}
              {claim.resolver ? (
                <>
                  <h3 className='flex flex-row gap-1'>
                    <strong>Resolver ID:</strong>
                    <div
                      className='text-blue-600 hover:text-blue-500 hover:underline cursor-pointer'
                      onClick={() =>
                        handleUserIdClick(
                          claim.resolver ? claim.resolver : null
                        )
                      }
                    >
                      {claim.resolver.userId}
                    </div>
                  </h3>
                  <h3>
                    <strong>Date resolved:</strong>{' '}
                    {claim.resolved && new Date(claim.resolved).toUTCString()}
                  </h3>
                  <h3>
                    <strong>Amount settled:</strong> $
                    {claim?.settled?.toFixed(2)}
                  </h3>
                  <section className='flex flex-col'>
                    <h3 className='text-blue-600 font-bold text-center py-5'>
                      This claim has already been resolved
                    </h3>
                  </section>
                </>
              ) : (
                <section className='flex flex-col'>
                  <h3 className='text-blue-600 font-bold text-center py-5'>
                    Once this claim has been resolved, its status cannot be
                    changed.
                  </h3>
                  {isSettling && (
                    <>
                      <h3>
                        <strong>Amount settled:</strong>
                      </h3>
                      <div className='flex flex-col gap-5 py-5'>
                        <div className='radio'>
                          <label className='flex flex-row items-center gap-5'>
                            <input
                              type='radio'
                              name='react-tips'
                              value='option1'
                              checked={selectedOption === 'option1'}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              className='form-check-input'
                            />
                            Full amount: ${claim.claimed.toFixed(2)}
                          </label>
                        </div>
                        <div className='radio'>
                          <label className='flex flex-row items-center gap-5'>
                            <input
                              type='radio'
                              name='react-tips'
                              value='option2'
                              checked={selectedOption === 'option2'}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              className='form-check-input'
                            />
                            <div>
                              Other amount: $
                              <input
                                disabled={
                                  selectedOption === 'option2' ? false : true
                                }
                                className='bg-gray-100 shadow-inner rounded-md px-5 py-2 disabled:bg-gray-300'
                                type='text'
                                placeholder='Amount'
                                value={settled}
                                onChange={handleAmountChange}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='flex flex-row justify-center gap-5'>
                    {isSettling ? (
                      <>
                        <SettleButton onClick={() => setStatus('settled')} />
                        <button
                          className='text-blue-600 hover:text-blue-500 hover:underline'
                          onClick={() => setSettling(false)}
                        >
                          Go back
                        </button>
                      </>
                    ) : (
                      <>
                        <ApproveButton onClick={handleSettling} />
                        <DenyButton onClick={() => setStatus('denied')} />
                      </>
                    )}
                  </div>
                </section>
              )}
            </div>
          )}
        </form>
      )}
      {showUserInfo && user && (
        <InlineModal onClose={() => setShowUserInfo(false)}>
          {UserInfo(user)}
        </InlineModal>
      )}
    </div>
  );
}
