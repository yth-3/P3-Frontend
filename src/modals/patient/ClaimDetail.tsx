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
            <strong>Date submitted:</strong>{' '}
            {claim && new Date(claim?.submitted).toUTCString()}
          </h3>
          <h3>
            <strong>Amount claimed:</strong> ${claim?.claimed.toFixed(2)}
          </h3>
          <h3>
            <strong>Type:</strong> {claim?.type.type}
          </h3>
          <h3>
            <strong>Claim description:</strong> {claim?.description}
          </h3>
          <h3>
            <strong>Claim status:</strong> {claim?.status.status}
          </h3>
          {claim?.receipt && (
            <h3>
              <strong>Claim receipt:</strong> {claim?.receipt}
            </h3>
          )}
          {claim?.resolver && (
            <>
              <h3>
                <strong>Resolver ID:</strong> {claim.resolver.userId}
              </h3>
              <h3>
                <strong>Date resolved:</strong>{' '}
                {claim.resolved && new Date(claim.resolved).toUTCString()}
              </h3>
              <h3>
                <strong>Amount settled:</strong> ${claim?.settled?.toFixed(2)}
              </h3>
            </>
          )}
        </div>
      )}
    </>
  );
}
