import LargeButton from '../components/ui/LargeButton';

type Props = {
  onClick: Function;
};
export default function LoggedOut({ onClick }: Props) {
  function handleClick() {
    onClick();
  }
  return (
    <div>
      <div>Your session has expired. Please login again</div>
      <LargeButton onClick={handleClick}>Ok</LargeButton>
    </div>
  );
}
