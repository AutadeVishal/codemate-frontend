
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password }, {
        withCredentials: true,//for cookies
      });console.log(res)
      const user = res.data;
      
      dispatch(setUser(user));
      return navigate('/');
    }
    catch (err) {
      console.log("Error in Login")
      setError(err?.response?.data)

    }
  }
  return (
    <div className="flex justify-center mt-10">
      <fieldset className="flex flex-col fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <p className="justify-center font-bold text-2xl text-red-500 fieldset-legend">{error}</p>
        <p className="justify-center font-bold text-2xl fieldset-legend">Login</p>

        <label className="label">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4" onClick={() => handleLogin()}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login
