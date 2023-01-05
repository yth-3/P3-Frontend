import ActionLink from '../components/ui/ActionLink';

export default function LandingPage() {
  return (
    <main className='flex flex-col gap-10'>
      <header>
        <h2 className='text-3xl'>Welcome to Composite Care</h2>
        <div>Composite Cares about every aspect of your health.</div>
        <div>From scheduling to filing claims, we make it easy every step of the way.</div>
      </header>
      
      <section className='flex'>
        Already a member?
        <ActionLink to="login">Login</ActionLink>
        or 
        <ActionLink to="/signup">Create Account</ActionLink>
      </section>
    </main>
  )
}
