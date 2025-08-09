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
        withCredentials: true, // for cookies
      });
      const user = res.data.data;
      dispatch(setUser(user));
      return navigate('/');
    }
    catch (err) {
      console.log("Error in Login")
      setError(err?.response?.data)
    }
  }

  const labelClass = "text-sm text-white/80";
  const inputClass = "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/60 focus:border-white/40 outline-none";

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 text-white">
      <fieldset className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
        {error ? (
          <p className="text-center font-semibold text-red-400 mb-2">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </p>
        ) : null}
        <p className="text-center text-2xl font-semibold mb-4">Login</p>

        <div className="space-y-1">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1 mt-3">
          <label className={labelClass}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
            placeholder="Password"
          />
        </div>

        <button
          className="w-full mt-5 rounded-full bg-white/15 text-white hover:bg-white/25 px-4 py-2 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>
    </div>
  )
}

export default Login