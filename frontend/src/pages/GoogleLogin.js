// import React, { useState, useEffect } from 'react'
// import { FcGoogle } from 'react-icons/fc'
// import {
//   useGoogleLoginUrlQuery,
//   useGoogleLoginMutation,
// } from '../slices/userApiSlice' // Use mutation
// import { useSelector, useDispatch } from 'react-redux'
// import { FaUser, FaPen, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'
// import { useNavigate, useLocation, Link } from 'react-router-dom'
// import { setCredentials, logout } from '../slices/authSlice'

// const GoogleLogin = () => {
//   const { data, isLoading, error } = useGoogleLoginUrlQuery() // Get the Google login URL
//   const [googleLogin] = useGoogleLoginMutation() // Get the mutation hook for Google login

//   const { userInfo } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const navigate = useNavigate()
//   const { search } = useLocation()
//   const sp = new URLSearchParams(search)
//   const redirect = sp.get('redirect') || '/'

  
//   // Handle the Google login success and fetch user data
//   const handleGoogleLoginSuccess = async (response) => {
//     const token = response.tokenId
//     try {
//       const userData = await googleLogin({ token }).unwrap() // Log userData here
//       console.log(userData) // Check if userData contains the expected fields
//       dispatch(setCredentials(userData)) // Dispatch to Redux
//       navigate(redirect) // Redirect after login
//     } catch (error) {
//       console.error('Google login error:', error)
//     }
//   }


//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/login')
//   }
// useEffect(() => {
//   if (userInfo) {
//     navigate(redirect)
//   }
// }, [userInfo, redirect, navigate])

//   {
//     userInfo && userInfo.username ? (
//       <div className='nav-dropdown'>
//         <button
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//           className='nav-user'
//         >
//           <div className='avatar'>
//             {userInfo.image ? (
//               <img
//                 src={userInfo.image}
//                 alt='User Avatar'
//                 className='avatar-img'
//               />
//             ) : (
//               <FaUser />
//             )}
//           </div>
//           <span className='username'>{userInfo.username}</span>
//         </button>
//         {dropdownOpen && (
//           <div className='dropdown-user'>
//             <Link to='/profile' className='dropdown-item'>
//               <FaUser /> Profile
//             </Link>
//             <Link to='/user/create-blog' className='dropdown-item'>
//               <FaPen /> Write a Post
//             </Link>
//             <Link to='/user/my-blog' className='dropdown-item'>
//               <FaFileAlt /> My Post
//             </Link>
//             <button onClick={handleLogout} className='dropdown-item'>
//               <FaSignOutAlt /> Logout
//             </button>
//           </div>
//         )}
//       </div>
//     ) : (
//       <p>Loading user data...</p>
//     )
//   }


//   if (isLoading) return <p>Loading...</p>
//   if (error) return <p>Error: {error.message}</p>

//   return (
//     <a href={data?.url} onClick={() => handleGoogleLoginSuccess(data)}>
//       <button className='fa-google'>
//         <FcGoogle />
//       </button>
//     </a>
//   )
// }

// export default GoogleLogin
import React from 'react'

const GoogleLogin = () => {
  return (
    <div>
      
    </div>
  )
}

export default GoogleLogin
