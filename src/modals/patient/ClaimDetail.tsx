import { useRecoilValue } from 'recoil';
import { claimState } from '../../App';

export default function ClaimDetail() {
  const claim = useRecoilValue(claimState);

  return (
    <>
      {claim && (
        <div>
          <h3>
            <strong>Claim ID:</strong> {claim?.claimId}
          </h3>
          <h3>
            <b>Date submitted:</b>{' '}
            {claim && new Date(claim?.submitted).toUTCString()}
          </h3>
          <h3>
            <b>Amount claimed:</b> ${claim?.claimed.toFixed(2)}
          </h3>
          <h3>
            <b>Type:</b> {claim?.type.type}
          </h3>
          <h3>
            <b>Claim description:</b> {claim?.description}
          </h3>
          <h3>
            <b>Claim status:</b> {claim?.status.status}
          </h3>
          {claim?.receipt && (
            <h3>
              <b>Claim receipt:</b> {claim?.receipt}
            </h3>
          )}
          {claim?.resolver && (
            <>
              <h3>
                <b>Resolver ID:</b> {claim.resolver.userId}
              </h3>
              <h3>
                <b>Date resolved:</b>{' '}
                {claim.resolved && new Date(claim.resolved).toUTCString()}
              </h3>
              <h3>
                <b>Amount settled:</b> ${claim?.settled?.toFixed(2)}
              </h3>
            </>
          )}
        </div>
      )}
    </>
  );
}
