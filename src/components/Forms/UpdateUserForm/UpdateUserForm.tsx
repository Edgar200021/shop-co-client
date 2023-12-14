import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '../../../utils/cn'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import Input, { InputVariants } from '../../ui/Input/Input'
import {
  UpdateUserSchema,
  updateUserSchema,
} from '../../../schemas/updateUser-schema'
import toast from 'react-hot-toast'
import { IUserResponse } from '../../../store/auth/types'

interface Props {
  className?: string
  user: IUserResponse
  close: () => void
}

export default function UpdateUserForm({ className, user, close }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: user.name, email: user.email },
  })

  return (
    <form className={cn('p-6 max-w-[480px] w-full', className)}>
      <fieldset className="p-0 m-0 border-0 relative ">
        <span className="block font-bold text-[32px] mb-1 ">Personal data</span>
        <label className="mb-4">
          <span className="block text-sm text-[#9E9E9E] mb-1">name</span>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                variant={InputVariants.PRIMARY}
                defaultValue={user.name}
                placeholder="Name"
                {...field}
              />
            )}
          />
        </label>
        <label className="mb-4">
          <span className="block text-sm text-[#9E9E9E] mb-1">email</span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                variant={InputVariants.PRIMARY}
                defaultValue={user.email}
                placeholder="Email"
                {...field}
              />
            )}
          />
        </label>
        <Button
          variant={ButtonVariants.PRIMARY}
          className="rounded-lg  mt-5 text-white max-w-full mb-3 disabled:cursor-not-allowed disabled:bg-green-300"
        >
          Update
        </Button>
        <Button
          variant={ButtonVariants.PRIMARY}
          className="rounded-lg bg-[#F5F5F7] text-black max-w-full"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="w-8 h-8 absolute right-0 top-0 rounded-lg bg-[#F5F5F7]"
          variant={ButtonVariants.CLEAR}
          onClick={close}
        >
          X
        </Button>
      </fieldset>
    </form>
  )
}
