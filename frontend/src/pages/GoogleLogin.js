import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import { useProfileMutation } from '../slices/userApiSlice'
import { GoogleLogin } from '@react-oauth/google'

const GoogleLoginComponent = () => {
  const [token, setToken] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Profile API
  const [getProfile] = useProfileMutation()

  useEffect(() => {
    // Check if the token exists in URL params
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get('token')

    if (tokenFromUrl) {
      setToken(tokenFromUrl) // Set token from URL to state
    }
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token }))

      // Fetch profile data with the token
      getProfile({ token })
        .unwrap()
        .then((response) => {
          navigate('/profile')
        })
        .catch((error) => {
          console.error('Failed to fetch profile:', error)
        })
    }
  }, [token, dispatch, getProfile, navigate])

  const responseGoogle = (response) => {
    if (response.error) {
      console.error('Google login error:', response.error)
    } else {
      // On successful login, extract Google token
      const googleToken = response.credential
      // Store the token in localStorage
      localStorage.setItem('authToken', googleToken)
      // Redirect to profile or other necessary page
      navigate('/profile')
    }
  }

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
    </div>
  )
}

export default GoogleLoginComponent
