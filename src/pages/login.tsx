import {NextPage} from 'next';
import {useRouter} from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { CreateUserInput } from "../schema/user.schema";

const Login:NextPage = () => {
  const router = useRouter()
  const {handleSubmit,register} = useForm<CreateUserInput>()
  // const {mutate,error} = trpc.useMutation(['user.register-user'],{
  //   onSuccess:() => {
  //     router.push('/login')
  //   }
  // })
  const handleFormSubmit = (values:CreateUserInput) => {
    // mutate(values)
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/*{error && error.message}*/}
        <input type={'email'} placeholder='sample@sample.com' {...register('email')}/>
        <br/>
        <input type={'password'} {...register('password')}/>
        <button type={'submit'}>Login</button>

      </form>
      <Link href={'/register'}>Register</Link>
    </>
  );
};

export default Login;
