import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {withTRPC} from "@trpc/next";
import superjson from 'superjson'
import {loggerLink} from "@trpc/client/src/links/loggerLink";
import {httpBatchLink} from "@trpc/client/src/links/httpBatchLink";
import { AppRouter } from "../server/route/app.router";
import {url} from '../constants'
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
  const {data,error,isLoading} = trpc.useQuery(['user.me'])
  if(isLoading) {
    return <p>Loading...</p>
  }
  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  )

}

export default withTRPC<AppRouter>({
  config({ctx}) {
    return {
      queryClientConfig:{
        defaultOptions:{
          queries:{
            staleTime:60
          }
        }
      },
      headers() {
        if(ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr':'1'
          }
        }
        return {}
      },
      url,
      transformer: superjson
    }
  },
  ssr:false
})(MyApp)
