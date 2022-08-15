import {NextPage} from 'next';
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('../components/LoginForm'),{
  ssr:false
})

const Login:NextPage = () => {

  return (
    <div>
      <LoginForm/>
    </div>
  );
};

export default Login;
