import type { NextPage } from 'next'
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
 const user = useUserContext()
  console.log (user)
  if(!user) {
    return <LoginForm/>
  }
  return (
    <div>
      <p>Hi!! {user.name}</p>
      <div>
        <p>Contents</p>
        <Link href={'/post/new'}>Create Post</Link>
      </div>
    </div>
  )
}

export default Home
