import { useState } from 'react';

import LoginForm from '../components/forms/LoginForm';
import Spinner from '../components/ui/Spinner';

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  
  return (
    <div>
      {
        isLoading ?
          <Spinner />
        :
          <LoginForm setLoading={setLoading} />
      }
    </div>
  )
}
