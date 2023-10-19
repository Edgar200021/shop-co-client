import LoginForm from '../components/Forms/LoginForm/LoginForm'

interface Props {
  className?: string
}

export default function LoginPage({ className }: Props) {
  return (
    <main className={className}>
      <section>
        <LoginForm />
      </section>
    </main>
  )
}
