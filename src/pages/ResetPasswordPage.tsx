import { useParams } from 'react-router-dom'
import ResetPasswordForm from '../components/Forms/ResetPasswordForm/ResetPasswordForm'

interface Props {
  className?: string
}

export default function ResetPasswordPage({ className }: Props) {
  const { token } = useParams()
  console.log(token)
  return (
    <main className={className}>
      <section>
        <ResetPasswordForm resetPasswordToken={token!} />
      </section>
    </main>
  )
}
