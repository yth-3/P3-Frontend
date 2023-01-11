import { useRecoilValue } from 'recoil';

import { claimState } from '../../App';
import { ApproveButton, DenyButton } from '../../components/ui/ResolveButton';

export default function ResolveClaim() {
  const claim = useRecoilValue(claimState);

  async function approve() {
    console.log('approved');
  }

  async function deny() {
    console.log('denied');
  }

  return (
    <>
      { claim &&
        <div>
          <h3><strong>Claim ID:</strong> {claim?.id}</h3>
          <h3><strong>Submitter ID:</strong> {claim?.submitterId}</h3>
          <h3><strong>Date submitted:</strong> {claim?.submitted.toUTCString()}</h3>
          <h3><strong>Amount claimed:</strong> ${claim?.claimed}</h3>
          <h3><strong>Claim type:</strong> {claim?.type}</h3>
          <h3><strong>Claim description:</strong> {claim?.description}</h3>
          <h3><strong>Claim status:</strong> {claim?.status}</h3>
          { claim?.receipt &&
            <h3><strong>Claim receipt:</strong> {claim?.receipt}</h3>
          }
          {
            claim?.resolverId ?
              <>
                <h3><strong>Resolver ID:</strong> {claim?.resolverId}</h3>
                <h3><strong>Date resolved:</strong> {claim?.resolved?.toUTCString()}</h3>
                <h3><strong>Amount settled:</strong> ${claim?.settled}</h3>
              </>
            :
              <section className='flex flex-col'>
                <h3 className='text-blue-600 font-bold text-center py-5'>Once this claim has been resolved, its status cannot be changed.</h3>
                <div className='flex flex-row justify-center gap-5'>
                  <ApproveButton onClick={() => approve()} />
                  <DenyButton onClick={() => deny()}/>
                </div>
              </section>
          }
        </div>
      }
    </>
  )
}
