import z from 'zod'

export const reviewSchema = z.object({
  text: z
    .string()
    .trim()
    .nonempty()
    .min(20, { message: 'Text must contain min 20 characters' })
    .max(400, { message: 'Text must contain max 400 characters' }),
})

export type ReviewSchema = z.infer<typeof reviewSchema>
