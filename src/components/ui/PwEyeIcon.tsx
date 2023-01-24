import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type Props = {
  isPwVisible: boolean;
  setPwVisible: Function;
};

export default function PwEyeIcon({ isPwVisible, setPwVisible }: Props) {
  return (
    <>
      {isPwVisible ? (
        <EyeSlashIcon
          className='hover:bg-gray-200 rounded-md h-10 w-10 px-2 cursor-pointer'
          onClick={() => setPwVisible(false)}
        />
      ) : (
        <EyeIcon
          className='hover:bg-gray-200 rounded-md h-10 w-10 px-2 cursor-pointer'
          onClick={() => setPwVisible(true)}
        />
      )}
    </>
  );
}
