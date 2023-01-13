type Props = {
  onClick: Function;
};
export function ApproveButton({ onClick }: Props): JSX.Element {
  return (
    <button
      className='bg-green-500 hover:bg-green-400 p-3 rounded-sm text-slate-50'
      onClick={(e) => onClick(e)}
    >
      Approve
    </button>
  );
}

export function DenyButton({ onClick }: Props): JSX.Element {
  return (
    <button
      className='bg-red-500 hover:bg-red-400 p-3 rounded-sm text-slate-50'
      onClick={(e) => onClick(e)}
    >
      Deny
    </button>
  );
}
