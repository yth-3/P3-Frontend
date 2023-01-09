import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { claimState } from '../../App';
import { ApproveButton, DenyButton } from '../../components/ui/ResolveButton';

export default function ResolveClaim() {
  const claim = useRecoilValue(claimState);
  const navigate = useNavigate();

  return (
    <div>
      <h3><b>Claim ID:</b> {claim?.id}</h3>
      <h3><b>Submitter ID:</b> {claim?.submitterId}</h3>
      <h3><b>Date submitted:</b> {claim?.submitted.toUTCString()}</h3>
      <h3><b>Amount claimed:</b>  {claim?.claimed}</h3>
      <h3><b>Claim type:</b>  {claim?.type}</h3>
      <h3><b>Claim description:</b>  {claim?.description}</h3>
      <h3><b>Claim status:</b>  {claim?.status}</h3>
      { claim?.receipt &&
        <h3><b>Claim receipt:</b>  {claim?.receipt}</h3>
      }
      { claim?.resolverId ?
        <>
          <h3><b>Resolver ID:</b>  {claim?.resolverId}</h3>
          <h3><b>Date resolved:</b>  {claim?.resolved?.toUTCString()}</h3>
          <h3><b>Amount settled:</b>  {claim?.settled}</h3>
        </> :
        <section className='flex flex-row justify-center gap-5'>
          <ApproveButton onClick={() => navigate("")} />
          <DenyButton onClick={() => navigate("")}/>
        </section>
      }
    </div>
  )
}
