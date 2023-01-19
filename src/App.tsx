import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import Modal from './components/Modal';
import Router from './components/Router';
import {
  LOGGED_OUT,
  ONE_HOUR,
  PRINCIPAL,
  TOKEN_START,
} from './utility/constants';
import { Claim, User } from './utility/types';

export const modalState = atom<string | null>({
  key: 'modalState',
  default: null,
});
export const principalState = atom<User | null>({
  key: 'principalState',
  default: null,
});
export const claimState = atom<Claim | null>({
  key: 'claimState',
  default: null,
});

function App() {
  const [principal, setPrincipal] = useRecoilState(principalState);
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout | undefined>();
  const setModalState = useSetRecoilState(modalState);
  const navigate = useNavigate();

  useEffect(() => {
    const principalString = localStorage.getItem(PRINCIPAL);
    if (principalString && setPrincipal) {
      const principal: User = JSON.parse(principalString);
      setPrincipal(principal);
    }
  }, [setPrincipal]);

  const clearPrincipal = useCallback(() => {
    localStorage.clear();
    setModalState(LOGGED_OUT);
    setPrincipal(null);
    navigate('/');
  }, [navigate, setModalState, setPrincipal]);

  useEffect(() => {
    clearTimeout(timeout);
    const tokenStart = localStorage.getItem(TOKEN_START);
    if (!tokenStart) return;
    if (!principal) return;

    const start = Number(tokenStart);
    const now = Date.now();
    const elapsed = now - start;

    if (elapsed > ONE_HOUR) {
      clearPrincipal();
    } else {
      const newTimeout = setTimeout(clearPrincipal, ONE_HOUR - elapsed);
      setTimeoutState(newTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, clearPrincipal]);

  return (
    <>
      <Router />
      <Modal />
    </>
  );
}

export default App;
