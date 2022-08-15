import {PrismaClient} from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined
}

// @ts-ignore
export const prisma = global.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma
}