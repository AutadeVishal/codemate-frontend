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
      dispatch(setUser(res.data));
      console.log("User Fetched Successfully by Body Component");
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
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};


export default Body