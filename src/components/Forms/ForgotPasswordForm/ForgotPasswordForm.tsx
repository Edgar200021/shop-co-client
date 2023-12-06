import toast from 'react-hot-toast'
import { useForgotPasswordMutation } from '../../../store/auth/authApi'
import { cn } from '../../../utils/cn'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import { FormEvent, useState } from 'react'

interface Props {
  className?: string
}

export default function ForgotPasswordForm({ className }: Props) {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await forgotPassword({ email }).unwrap()
      toast.success('Success ✅. Please check your email')
      setEmail('')
    } catch (error) {
      console.log(error)
      if ('data' in error && 'status' in error.data)
        toast.error(
          error.data.status === 'fail'
            ? `User with email ${email} doesn't exist`
            : 'Something went wrong. Please try again later!'
        )
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleForgotPassword}
      className={cn('w-form mx-auto', className)}
    >
      <fieldset className="m-0 p-0 b-0" disabled={isLoading}>
        <Input
          className="mb-5"
          variant={InputVariants.PRIMARY}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          className={cn('max-w-full', { 'cursor-not-allowed': isLoading })}
          variant={ButtonVariants.PRIMARY}
        >
          {isLoading ? 'Loading...' : 'Forgot Password'}
        </Button>
      </fieldset>
    </form>
  )
}
