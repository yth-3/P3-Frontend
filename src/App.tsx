import { useEffect } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import Modal from './components/Modal';
import Router from './components/Router';
import { PRINCIPAL } from './utility/constants';
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
export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

function App() {
  const setPrincipal = useSetRecoilState(principalState);

  useEffect(() => {
    const principalString = localStorage.getItem(PRINCIPAL);
    if (principalString && setPrincipal) {
      const principal: User = JSON.parse(principalString);
      setPrincipal(principal);
    }
  }, [setPrincipal]);

  return (
    <>
      <Router />
      <Modal />
    </>
  );
}

export default App;
