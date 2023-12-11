import toast from 'react-hot-toast'
import { cn } from '../../../utils/cn'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import { useResetPasswordMutation } from '../../../store/auth/authApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  RegisterSchema,
  registerSchema,
} from '../../../schemas/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { errorHandlerAPI } from '../../../utils/errorHandler'

interface Props {
  className?: string
  resetPasswordToken: string
}

export default function ResetPasswordForm({
  className,
  resetPasswordToken,
}: Props) {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<RegisterSchema, 'password' | 'passwordConfirm'>>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<
    Pick<RegisterSchema, 'password' | 'passwordConfirm'>
  > = async data => {
    try {
      await resetPassword({ ...data, token: resetPasswordToken }).unwrap()
      toast.success('Success ✅.')
      navigate('/auth/login')
    } catch (error) {
      errorHandlerAPI(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-form mx-auto', className)}
    >
      <fieldset className="m-0 p-0 b-0" disabled={isLoading}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              className="mb-5"
              variant={InputVariants.PRIMARY}
              type="password"
              placeholder="Password"
            />
          )}
        />
        {errors.password && errors.password.message}

        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field }) => (
            <Input
              {...field}
              className="mb-5"
              variant={InputVariants.PRIMARY}
              type="password"
              placeholder="Confirm password"
            />
          )}
        />
        {errors.passwordConfirm && errors.passwordConfirm.message}

        <Button
          className={cn('max-w-full', { 'cursor-not-allowed': isLoading })}
          variant={ButtonVariants.PRIMARY}
        >
          {isLoading ? 'Loading...' : 'Reset Password'}
        </Button>
      </fieldset>
    </form>
  )
}
