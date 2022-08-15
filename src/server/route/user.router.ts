import {createRouter} from "../createRouter";
import { createUserSchema,createUserOutputSchema } from "../../schema/user.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server'

export const userRouter = createRouter()
.mutation('register-user',{
  input:createUserSchema,
  //output:createUserOutputSchema,
  async resolve({ctx,input}) {
    const {email,password,name} = input
    try {
      const user = await ctx.prisma.user.create({
        data:{
          name,
          email,
          password
        }
      })
      return user
    }catch ( e ) {
      if(e instanceof PrismaClientKnownRequestError) {
        if(e.code === 'P2002') {
          throw new trpc.TRPCError({
            code:'CONFLICT',
            message:'このアカウントは使用できません。'
          })
        }
      }
      throw new trpc.TRPCError({
        code:'INTERNAL_SERVER_ERROR',
        message:'サーバーの不具合が発生しております。'
      })
    }
  }
})