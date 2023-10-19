import z from 'zod'

export const addressSchema = z.object({
  street: z.string().trim().nonempty(),
  houseNumber: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Number of house must be between 1 and 300' })
    .lte(300, { message: 'Number of house must be between 1 and 300' }),
  entrance: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Entrance  must be between 1 and 20' })
    .lte(20, { message: 'Entrance  must be between 1 and 20' }),
  floor: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Floor  must be between 1 and 40' })
    .lte(40, { message: 'Floor  must be between 1 and 40' }),
  apartment: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Apartment must be between 1 and 60' })
    .lte(60, { message: 'Apartment  must be between 1 and 60' }),
})

export type AddressSchema = z.infer<typeof addressSchema>
