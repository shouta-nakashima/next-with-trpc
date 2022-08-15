import {createRouter} from "../createRouter";
import { createUserSchema , createUserOutputSchema , loginSchema , verifyOtpSchema } from "../../schema/user.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from '@trpc/server'
import { sendEmail } from "../../utils/mailer";
import { baseUrl,url } from "../../constants";
import { decode , encode } from "../../utils/base64";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

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
  .mutation('login-user',{
    input:loginSchema,
    async resolve({input,ctx}) {
      const {email,password,redirect} = input

      const user = await ctx.prisma.user.findUnique({
        where: {
          email
        }
      })
      if(!user) {
        throw new trpc.TRPCError({
          code:'NOT_FOUND',
          message:'ユーザーが見つかりません。'
        })
      }
      const token = await ctx.prisma.loginToken.create({
        data:{
          redirect,
          user: {
            connect:{
              id:user.id
            }
          }
        }
      })

      sendEmail({
        token:encode(`${token.id}:${user.email}`),
        url: baseUrl,
        email:user.email
      })
      return true
    }
  }).query('verify-otp', {
    input: verifyOtpSchema,
    async resolve({ input, ctx }) {
      const decoded = decode(input.hash).split(':')

      const [id, email] = decoded

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      })

      if (!token) {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid token',
        })
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
      })

      ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

      return {
        redirect: token.redirect,
      }
    },
  })
.query('me',{
  resolve({ctx}) {
    return ctx.user
  }
})