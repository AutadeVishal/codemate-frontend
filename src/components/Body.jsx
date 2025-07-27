import React from 'react'
import NavBar from "./Important UI Related/NavBar"
import { Outlet } from 'react-router-dom'
import Footer from './Important UI Related/Footer'

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
