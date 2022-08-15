import { NextApiRequest , NextApiResponse } from "next";
import {prisma} from "../utils/prisma";
import { verifyJwt } from "../utils/jwt";

interface CtxUser {
  id:string
  email:string
  name:string
  iat:string
  exp:number
}

const getUserFromRequest = (req:NextApiRequest) => {
  const token = req. cookies.token
  if(token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      const user = {
        id:verified.id,
        name:verified.name,
        iat:verified.iat,
        exp:verified.exp,
        email:verified.email
      }
      return user
    }catch ( e ) {
      return null
    }
  }
  return null
}

export const createContext = ({req,res}:{req:NextApiRequest,res:NextApiResponse}) => {
  const user = getUserFromRequest(req)
  return {req,res,prisma,user}
}

export type Context = ReturnType<typeof createContext>