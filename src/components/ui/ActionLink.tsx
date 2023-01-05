import { Link } from 'react-router-dom';

type Props = {
  children: | JSX.Element | JSX.Element[] | string | string[];
  to: string;
}
export default function ActionLink({ children, to }: Props) {
  return (
    <Link
      to={to}
    >
      {children}
    </Link>
  )
}
