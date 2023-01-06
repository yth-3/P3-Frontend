import { Link } from 'react-router-dom';

type Props = {
  children: | JSX.Element | JSX.Element[] | string | string[];
  to: string;
};
export default function LargeLink({ children, to }: Props): JSX.Element {
  return (
    <Link
      className='bg-green-500 hover:bg-green-400 p-3 rounded-sm text-slate-50'
      to={to}
    >
      {children}
    </Link>
  )
}
