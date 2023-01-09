import { useRecoilValue } from 'recoil';
import { claimState } from '../../App';

export default function ClaimDetail() {
  const claim = useRecoilValue(claimState);

  return (
    <div>
      <h3>{claim?.description}</h3>
    </div>
  )
}
