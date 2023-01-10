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
  key: 'pricipalState',
  default: null,
});
export const claimState = atom<Claim | null>({
  key: 'claimState',
  default: null,
});

function App() {
  const setPrincipal = useSetRecoilState(principalState);

  useEffect(() => {
    const principalString = localStorage.getItem(PRINCIPAL);
    if (principalString) {
      const pricipal: User = JSON.parse(principalString);
      setPrincipal(pricipal);
    }
  });

  return (
    <>
      <Router />
      <Modal />
    </>  
  );
}

export default App;
