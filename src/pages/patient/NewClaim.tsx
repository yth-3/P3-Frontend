import { useNavigate } from 'react-router-dom';

export default function NewClaim() {
  const navigate = useNavigate();


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          
        </label>
        <button>Submit</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
    
  )
}
