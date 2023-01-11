import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { principalState } from '../App';
import { PRINCIPAL } from '../utility/constants';

type Props = {
  role: string | null;
};
export default function ProtectedRoute({ role }: Props) {
  let principal = useRecoilValue(principalState);
  
  if (principal === null) {
    const principalString = localStorage.getItem(PRINCIPAL);
    if (principalString) {
      principal = JSON.parse(principalString);
    }
  }

  if (!role && principal) {
    return <Navigate to={`/${principal.role.toLowerCase()}`} replace />
  }

  if (role && role !== principal?.role) {
    if (principal) {
      return <Navigate to={`/${principal.role.toLowerCase()}`} replace />
    }
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Outlet />
    </>
  );
}
