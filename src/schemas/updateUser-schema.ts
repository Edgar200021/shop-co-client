import z from 'zod'

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  email: z.string().email({ message: 'Invaliad email address' }),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
