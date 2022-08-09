import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {withTRPC} from "@trpc/next";
import superjson from 'superjson'
import {loggerLink} from "@trpc/client/src/links/loggerLink";
import {httpBatchLink} from "@trpc/client/src/links/httpBatchLink";
import { AppRouter } from "../server/route/app.router";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ctx}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL ? `https://${process.env.NEXT_PUBLIC_HOST_URL}/api/trpc` : 'http://localhost:3000/api/trpc'
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
