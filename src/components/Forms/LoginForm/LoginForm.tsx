import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import { cn } from '../../../utils/cn'
import { RegisterSchema } from '../../../schemas/register-schema'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/store'
import { useLoginMutation } from '../../../store/auth/authApi'
import { addUser } from '../../../store/user/userSlice'

interface Props {
  className?: string
}

export default function LoginForm({ className }: Props) {
  const { handleSubmit, control, reset } =
    useForm<Pick<RegisterSchema, 'email' | 'password'>>()

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<
    Pick<RegisterSchema, 'email' | 'password'>
  > = async data => {
    try {
      const res = await login(data).unwrap()
      dispatch(addUser(res.data.user))
      reset({ email: '', password: '' })
      toast.success('Success ✅', { duration: 3000 })
      navigate('/user/account/orders')
    } catch (error) {
      console.log(error)
      if ('status' in error && error.status === 400)
        toast.error('Emaill or password or not correct')
      if (error instanceof Error) toast.error(error.message)
    }
  }
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
              type="email"
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
              type="password"
              {...field}
            />
          )}
        />

        <Button
          to="/auth/forgot-password"
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
          disabled={isLoading}
          variant={ButtonVariants.PRIMARY}
          className={cn('max-w-full', { 'cursor-not-allowed': isLoading })}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </fieldset>
    </form>
  )
}
