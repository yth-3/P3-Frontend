import { useRecoilValue } from 'recoil';
import { claimState } from '../../App';

export default function ClaimDetail() {
  const claim = useRecoilValue(claimState);

  return (
    <>
      {claim && 
        <div>
          <h3>{claim.status}</h3>
          <div>{claim.description}</div>
          <div>${claim.claimed}</div>
          <div>{claim.type}</div>
          <div>{claim.id}</div>
          <div>{claim.description}</div>
        </div>
      }
    </>
  )
}
