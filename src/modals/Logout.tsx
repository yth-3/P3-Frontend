import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modalState, principalState } from '../App';

export default function Logout() {
  const setModal = useSetRecoilState(modalState);
  const setPrincipal = useSetRecoilState(principalState);
  const navigate = useNavigate();

  function handleYes() {
    setModal(null);
    setPrincipal(null);
    localStorage.clear();
    navigate('/');
  }
  return (
    <main className='flex flex-col justify-center gap-5'>
      <p>Are you sure you want to log out?</p>
      <div className='flex flex-row justify-center gap-5'>
        <button
          className='flex-grow bg-green-500 hover:bg-green-400 p-3 rounded-sm text-lg text-slate-50'
          onClick={handleYes}
        >
          Yes
        </button>
        <button
          className='flex-grow bg-red-500 hover:bg-red-400 p-3 rounded-sm text-lg text-slate-50'
          onClick={() => setModal(null)}
        >
          No
        </button>
      </div>
    </main>
  );
}
