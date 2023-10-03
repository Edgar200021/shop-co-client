import RegisterForm from '../components/Forms/RegisterForm/RegisterForm'

interface Props {
  className?: string
}

export default function RegisterPage({ className }: Props) {
  return (
    <main className={className}>
      <section>
        <RegisterForm />
      </section>
    </main>
  )
}
