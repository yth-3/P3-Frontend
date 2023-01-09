import { ArrowPathIcon } from "@heroicons/react/24/outline";


type Props = {
    onClick: Function;
  };
  export default function ReloadButton({ onClick }: Props): JSX.Element {
    return (
      <>
        <button
          className='flex flex-row items-center bg-blue-600 hover:bg-blue-500 p-3 rounded-sm text-slate-50 gap-1'
          onClick={(e) => onClick(e)}
        >
          <ArrowPathIcon className='h-4 w-4'/>
          { 'Reload' }
        </button>
      </>
    )
  }
