import { BrowserRouter } from 'react-router-dom';
import { atom, RecoilRoot } from 'recoil';
import Modal from './components/Modal';
import Router from './components/Router';
import { Claim } from './utility/types';

export const modalState = atom<string | null>({
  key: 'modalState',
  default: null,
});
export const claimState = atom<Claim | null>({
  key: 'claimState',
  default: null,
});

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
        <Modal />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
