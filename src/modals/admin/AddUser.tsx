import AddUserForm from '../../components/forms/AddUserForm';

type Props = {
  onFinish: Function;
};

export default function AddUser({ onFinish }: Props) {
  return (
    <main>
      <AddUserForm onFinish={onFinish} />
    </main>
  );
}
