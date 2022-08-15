import {NextPage} from 'next';
import {useRouter} from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { LoginUserInput } from "../schema/user.schema";
import { useState } from "react";

const VerifyToken = ({hash}:{hash:string}) => {
  const router = useRouter()
  const {data,isLoading} = trpc.useQuery(['user.verify-otp',{
    hash
  }])
  if(isLoading) {
    return <p>Verifying...</p>
  }

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

  return <p>Redirecting...</p>
}

const LoginForm = () => {
  const router = useRouter()
  const [success,setSuccess] = useState(false)
  const {handleSubmit,register} = useForm<LoginUserInput>()
  const {mutate,error} = trpc.useMutation(['user.login-user'],{
    onSuccess:() => {
      setSuccess(true)
    }
  })
  const handleFormSubmit = (values:LoginUserInput) => {
    mutate( { ...values ,redirect:router.asPath })
  }

  const hash = router.asPath.split('#token=')[1]

  if(hash) {
    return <VerifyToken hash={hash}/>
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {error && error.message}
        {success && <p>メールをご確認ください。</p>}
        <input type={'email'} placeholder='sample@sample.com' {...register('email')}/>
        <br/>
        <input type={'password'} {...register('password')}/>
        <button type={'submit'}>Login</button>

      </form>
      <Link href={'/register'}>Register</Link>
    </>
  );
};

export default LoginForm;