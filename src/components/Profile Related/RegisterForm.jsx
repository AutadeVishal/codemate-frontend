import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [skills, setSkills] = useState('')
    const [error, setError] = useState('')
    const labelClass = "text-sm text-white/80";
    const inputClass = "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/60 focus:border-white/40 outline-none";

    const handleRegister = async () => {
        try {
            const skillsArray = skills.split(',').map(skill => skill.trim());
            const res = await axios.post(`${BASE_URL}/auth/signup`, { email, password,skills: skillsArray,age,gender,firstName,lastName }, {
                withCredentials: true, // for cookies
            });
            const user = res.data.data;
            console.log(res.data.data)
            dispatch(setUser(user));
            return navigate('/profile');
        }
        catch (err) {
            console.log("Error in Login")
            setError(err?.response?.data)
        }
    }
    //  this is input
    //   {
    //   "firstName": "Rohit",
    //   "lastName": "Shahana",
    //   "email": "rohitsharma@gmail.com",
    //   "password": "Rohit@1234",
    //   "age": 26,
    //   "gender": "male",
    //   "skills": ["Node.js", "React.js", "MongoDB","Javascript","Communication","Tension","Opening"],
    //   "profileURL": "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
    // }
    return (
        <div className="min-h-[70vh] grid place-items-center px-4 text-white">
            <fieldset className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                {error ? (
                    <p className="text-center font-semibold text-red-400 mb-2">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </p>
                ) : null}
                <p className="text-center text-2xl font-semibold mb-4">Register</p>

                 <div className="space-y-1 mt-3">
                    <label className={labelClass}>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={inputClass}
                        placeholder="First Name"
                    />
                </div>

                <div className="space-y-1 mt-3">
                    <label className={labelClass}>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={inputClass}
                        placeholder="Last Name"
                    />
                </div>

                <div className="space-y-1">
                    <label className={labelClass}>email</label>
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

                <div className="space-y-1 mt-3">
                    <label className={labelClass}>Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={e => setSkills(e.target.value)}
                        className={inputClass}
                        placeholder="Your Skills (comma-separated)"
                    />
                </div>

               

               

                <div className="space-y-1 mt-3">
                    <label className={labelClass}>Gender</label>
                    <input
                        type="text"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className={inputClass}
                        placeholder="male / female "
                    />
                </div>

                <div className="space-y-1 mt-3">
                    <label className={labelClass}>Age</label>
                    <input
                        type="text"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        className={inputClass}
                        placeholder="Your Age "
                    />
                </div>

                <button
                    className="w-full mt-5 rounded-full bg-white/15 text-white hover:bg-white/25 px-4 py-2 transition"
                    onClick={handleRegister}
                >
                    Register
                </button>

            </fieldset>
        </div>
    )
}
export default RegisterForm;
