type Props = {
  children: | JSX.Element | JSX.Element[] | string | string[];
  onClick: Function;
};
export default function LargeButton({ children, onClick }: Props): JSX.Element {
  return (
    <button
      className='bg-green-500 hover:bg-green-400 p-3 rounded-sm text-slate-50'
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  )
}
