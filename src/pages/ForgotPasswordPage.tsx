import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm/ForgotPasswordForm'

interface Props {
  className?: string
}

export default function ForgotPasswordPage({ className }: Props) {
  return (
    <main className={className}>
      <section>
        <ForgotPasswordForm />
      </section>
    </main>
  )
}
