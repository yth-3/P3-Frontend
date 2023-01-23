import LargeButton from '../components/ui/LargeButton';

type Props = {
  onClick: Function;
};
export default function LoggedOut({ onClick }: Props) {
  function handleClick() {
    onClick();
  }
  return (
    <div className='flex flex-col gap-4'>
      <div>Your session has expired</div>
      <div>Please login again</div>
      <LargeButton onClick={handleClick}>Ok</LargeButton>
    </div>
  );
}
