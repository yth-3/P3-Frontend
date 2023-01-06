import { useRecoilState } from 'recoil'
import { modalState } from '../App';
import Login from '../modals/Login';
import './Modal.css';

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <>
      {modal &&
        <div
          id="modal-container"
          className='fixed top-0 left-0 w-full h-full'
          onClick={() => setModal(null)}
        >
          <div
            id="modal-content"
            className='fixed w-fit h-fit bg-white p-8 rounded shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            {modal === 'login' && <Login />}
          </div>
        </div>
      }
    </>
  )
}
