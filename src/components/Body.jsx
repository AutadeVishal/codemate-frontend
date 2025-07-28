import React from 'react'
import NavBar from "./Important UI Related/NavBar"
import { Outlet } from 'react-router-dom'
import Footer from './Important UI Related/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const fetchUser = async () => {
    try { 
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
        secure:false,
        headers:{
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg1ODU1YmI5NDI2ZjJmN2E1Y2Q5NzUiLCJpYXQiOjE3NTM2OTM3MTgsImV4cCI6MTc1MzY5NzMxOH0.gL3hGp5kJX598U6u8wQgF_MMCSxUAbc5fqOR_cDwvNw",
        }
       
      })
      dispatch(setUser(res.data));
      console.log(res.data)
    }catch(err){
      console.log("Error In Fetching User from Body Component")
      console.log(err)
    }

  }


  useEffect(() => {
    fetchUser();
  },[])
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
