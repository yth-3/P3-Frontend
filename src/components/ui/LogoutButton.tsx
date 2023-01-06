type Props = {
    children: | JSX.Element | JSX.Element[] | string | string[];
    onClick: Function;
  };
  export default function LogoutButton({ children, onClick }: Props): JSX.Element {
    return (
      <button
        className='bg-red-500 hover:bg-red-400 p-3 rounded-sm text-slate-50'
        onClick={(e) => onClick(e)}
      >
        {children}
      </button>
    )
  }
  