import React from 'react'
import { useState } from 'react'
import axios from 'axios'




const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password }, {
        withCredentials: true,//for cookies
      });
      console.log(res)
    }
    catch (err) {
      console.log(err)

    }
  }
  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

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
