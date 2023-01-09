import { useSetRecoilState } from 'recoil';

import { modalState } from '../../App';

export default function LogoutButton() {
  const setModal = useSetRecoilState(modalState);

  return (
    <button
      className='bg-red-500 hover:bg-red-400 p-3 rounded-sm text-slate-50'
      onClick={() => setModal('logout')}
    >
      Log out
    </button>
  )
}
