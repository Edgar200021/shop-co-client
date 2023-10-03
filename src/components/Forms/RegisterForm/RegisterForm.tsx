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
import { authApi } from '../../../store/auth/api'
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
  const [register, { isLoading }] = authApi.useRegisterMutation()

  const onSubmit: SubmitHandler<RegisterSchema> = async data => {
    await register(data)
      .unwrap()
      .then(data => {
        toast.success(data.msg, { duration: 6000 })
        reset()
      })
      .catch(err => toast.error(err.data.msg, { duration: 6000 }))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-form mx-auto', className)}
    >
      <fieldset
        className="border-none background-none p-0 m-0  "
        disabled={isLoading}
      >
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
          name="confirmPassword"
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
        {errors.confirmPassword && errors.confirmPassword.message}

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
