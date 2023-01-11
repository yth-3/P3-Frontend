import { useState } from 'react';

import LoginForm from '../components/forms/LoginForm';
import Spinner from '../components/ui/Spinner';

export default function Login() {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading && <Spinner />}
      {<LoginForm setLoading={setLoading} isLoading={isLoading} />}
    </>
  );
}
