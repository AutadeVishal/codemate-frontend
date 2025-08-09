import React from 'react'
import NavBar from "./Important UI Related/NavBar"
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Important UI Related/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);
  const [loading, setLoading] = React.useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data.data));
      console.log("User Fetched Successfully by Body Component :");
      console.log(res.data.data)
    } catch (err) {
      console.log("Error In Fetching User from Body Component :", err);

      navigate('/login')

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    } else {
      setLoading(false); // User already in Redux
    }
  }, []);

 if (loading) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <p className="text-xl font-bold text-white">Loading...</p>
      </div>
    </div>
  );
}

 return (
  <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 text-white">
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-md mx-4 my-6 p-4">
      <NavBar />
      <div className="my-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  </div>
);
};


export default Body