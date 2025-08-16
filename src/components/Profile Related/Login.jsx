import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm';
const Login = () => {

  const [isLogin,setIsLogin]=useState(true);




  return (<div>

    {isLogin ? <LoginForm /> : <RegisterForm />}
    <button
      className="w-full mt-5 rounded-full bg-white/15 text-white hover:bg-white/25 px-4 py-2 transition"
      onClick={()=>setIsLogin(!isLogin)}
    >
      {isLogin ? "New Here ? Register ":"Already a User ? Login"}    </button>
  </div>
  )
}

export default Login