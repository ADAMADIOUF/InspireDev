import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer/>
    </div>
  )
}

export default App
