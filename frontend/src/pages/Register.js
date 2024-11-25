import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loading'

const RegisterScreen = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const res = await register({ username, email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1 className='login-title'>Create Account</h1>
        <form onSubmit={submitHandler} className='login-form'>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              id='name'
              placeholder='Enter your name'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='form-input'
            />
          </div>
          <button type='submit' className='submit-button' disabled={isLoading}>
            {isLoading ? <Loader /> : 'Register'}
          </button>
        </form>

        <div className='login-links'>
          <div className='login-link'>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Sign In
            </Link>
          </div>
        </div>

        <div className='return-to-store'>
          <Link to='/all-posts'>Return to All Posts</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
