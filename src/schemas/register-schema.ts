import z from 'zod'
import validator from 'validator'

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(20, { message: 'Must be 20 or fewer characters long' }),
    email: z.string().email({ message: 'Invaliad email address' }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be 8 or more characters long' })
      .max(30, { message: 'Password must be 30 or fewer characters long' })
      .refine(validator.isStrongPassword, {
        message: 'Create a more complex password',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: "Passwords dont't match",
    path: ['confirmPassword'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
