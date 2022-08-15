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

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  redirect: z.string().default('/')
})

export const verifyOtpSchema = z.object({
  hash:z.string()
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>
export type LoginUserInput = z.TypeOf<typeof loginSchema>