import z from 'zod'

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title must have 3 or more characters' })
    .max(30, { message: 'Title must have 30 or less characters' }),
  description: z
    .string()
    .trim()
    .min(20, { message: 'Description must have 20 or more characters' })
    .max(200, { message: 'Description must have 200 or less characters' }),
  price: z.coerce.number({ invalid_type_error: 'Price must be number ' }),

  discount: z.coerce
    .number()
    .min(1, { message: 'Discount must be 1 or more %' })
    .max(99, 'Discount must be 99 or less %'),
})

export type ProductSchema = z.infer<typeof productSchema>

//<Controller
//name="colors"
//control={control}
//render={({ field }) => (
//  <Select
//	/* @ts-ignore */
//	options={COLORS}
//	placeholder="Choose product color"
//	isMulti
//	{...field}
//	onChange={val =>
//	  val.map(values => {
//		/* @ts-ignore */
//		setColors(values)
//		console.log(values)
//		/* @ts-ignore */
//		return values
//	  })
//	}
//  />
//)}
///>
