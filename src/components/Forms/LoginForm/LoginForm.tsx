import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import { cn } from '../../../utils/cn'
import { RegisterSchema } from '../../../schemas/register-schema'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface Props {
  className?: string
}

export default function LoginForm({ className }: Props) {
  const { handleSubmit, control, reset } =
    useForm<Pick<RegisterSchema, 'email' | 'password'>>()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<
    Pick<RegisterSchema, 'email' | 'password'>
  > = async data => {}
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-form mx-auto', className)}
    >
      <fieldset className="border-none bg-none m-0 p-0">
        <h1 className="text-center text-5xl font-bold mb-10">Sign in</h1>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              placeholder="Email"
              className="mb-5"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              variant={InputVariants.PRIMARY}
              placeholder="Password"
              className="mb-5"
              {...field}
            />
          )}
        />

        <Button
          to="/forgot-password"
          className="block mb-5"
          variant={ButtonVariants.CLEAR}
        >
          Forgot password ?
        </Button>
        <Button
          to="/auth/register"
          className="block mb-5"
          variant={ButtonVariants.CLEAR}
        >
          Doesn't have an account ?
        </Button>

        <Button
          variant={ButtonVariants.PRIMARY}
          className="max-w-full"
        ></Button>
      </fieldset>
    </form>
  )
}
