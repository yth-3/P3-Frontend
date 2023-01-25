import { useRecoilState } from 'recoil';

import { modalState } from '../App';
import Login from '../modals/Login';
import Signup from '../modals/Signup';
import Logout from '../modals/Logout';
import './Modal.css';
import {
  LOGGED_OUT,
  LOGIN,
  LOGOUT,
  SIGNUP,
  ACCOUNT,
} from '../utility/constants';
import LoggedOut from '../modals/LoggedOut';
import AccountSettings from '../modals/AccountSettings';

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  function handleClick() {
    setModal(null);
  }

  return (
    <>
      {modal && (
        <div
          id='modal-container'
          className='fixed top-0 left-0 w-full h-full'
          onClick={() => setModal(null)}
        >
          <div
            id='modal-content'
            className='fixed w-fit h-fit bg-white p-8 rounded shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            {modal === LOGIN && <Login />}
            {modal === SIGNUP && <Signup />}
            {modal === LOGOUT && <Logout />}
            {modal === LOGGED_OUT && <LoggedOut onClick={handleClick} />}
            {modal === ACCOUNT && <AccountSettings />}
          </div>
        </div>
      )}
    </>
  );
}
