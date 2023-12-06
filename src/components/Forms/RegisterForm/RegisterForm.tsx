import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import { cn } from '../../../utils/cn'
import {
  RegisterSchema,
  registerSchema,
} from '../../../schemas/register-schema'
import { useSignupMutation } from '../../../store/auth/authApi'
import { useNavigate } from 'react-router-dom'
interface Props {
  className?: string
}

export default function RegisterForm({ className }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })
  const [signup, { isLoading }] = useSignupMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterSchema> = async data => {
    try {
      await signup(data).unwrap()
      reset({ email: '', name: '', password: '', passwordConfirm: '' })
      toast.success('Success ✅', { duration: 3000 })
      navigate('/auth/login')
    } catch (error) {
      if ('data' in error && 'message' in error.data)
        toast.error(error.data.message as string)
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form
      className={cn('w-form mx-auto', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="border-none background-none p-0 m-0  ">
        <h1 className="text-center text-5xl font-bold mb-10">Create account</h1>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              {...field}
              placeholder="Name"
              className="mb-5"
            />
          )}
        />
        {errors.name && errors.name.message}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              {...field}
              placeholder="email"
              className="mb-5"
              type="email"
            />
          )}
        />
        {errors.email && errors.email.message}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              {...field}
              placeholder="Password"
              className="mb-5"
            />
          )}
        />
        {errors.password && errors.password.message}
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              {...field}
              placeholder="Confirm password"
              className="mb-2"
            />
          )}
        />
        {errors.passwordConfirm && errors.passwordConfirm.message}

        <Button
          to="/auth/login"
          className="block mb-5"
          variant={ButtonVariants.CLEAR}
        >
          Already have an account ?
        </Button>

        <Button
          variant={ButtonVariants.PRIMARY}
          className={cn('max-w-full', { 'cursor-not-allowed': isLoading })}
        >
          {isLoading ? 'Loading...' : 'Create account'}
        </Button>
      </fieldset>
    </form>
  )
}
