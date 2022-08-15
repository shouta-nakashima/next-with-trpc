import { createContext , ReactNode , useContext } from 'react'
import { AppRouter } from "../server/route/app.router";
import { inferProcedureInput , inferProcedureOutput } from "@trpc/server";



type TQuery = keyof AppRouter['_def']['queries']

type InferQueryInput<TRouteKey extends TQuery>= inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
  >

const UserContext = createContext<InferQueryInput<'user.me'>>(null)

const UserContextProvider = ({children,value}:{children:ReactNode,value:InferQueryInput<'user.me'> | undefined}) => {
  return <UserContext.Provider value={value || null}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export {useUserContext,UserContextProvider}