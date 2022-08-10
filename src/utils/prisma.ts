import {PrismaClient} from "@prisma/client/scripts/default-index";

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}