import { useRecoilState } from 'recoil';
import { modalState } from '../App';
import Login from '../modals/Login';
import Signup from '../modals/Signup';
import Logout from '../modals/Logout';
import './Modal.css';
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  VIEW_PATIENT_CLAIM,
} from '../utility/constants';
import ClaimDetail from '../modals/patient/ClaimDetail';

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

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
            {modal === VIEW_PATIENT_CLAIM && <ClaimDetail />}
          </div>
        </div>
      )}
    </>
  );
}
