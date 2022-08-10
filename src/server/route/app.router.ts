import {createRouter} from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createRouter().merge('user.',userRouter)

export type AppRouter = typeof appRouter