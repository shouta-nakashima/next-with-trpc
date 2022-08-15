import z from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>