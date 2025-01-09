import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  useProfileMutation,
  useUploadPostImageMutation,
} from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [updateProfile, { isLoading: updating }] = useProfileMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      setUserName(userInfo.username || '')
      setEmail(userInfo.email || '')
      setImage(userInfo.image || '')
    }
  }, [userInfo, navigate])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteAvatar = () => {
    setImage('')
    toast.info('Avatar removed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const updatedUser = await updateProfile({
        username,
        email,
        password,
        image,
      }).unwrap()

      dispatch(setCredentials(updatedUser))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile')
    }
  }

  return (
    <div className='profile-container'>
      <h2>My Profile</h2>
      {/* If the user logged in through Google, some fields might be disabled */}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            disabled={userInfo?.googleId} // Disable if logged in with Google
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={userInfo?.googleId} // Disable if logged in with Google
            required
          />
        </div>

        {!userInfo?.googleId && ( // Only show password fields if not logged in with Google
          <>
            <div className='form-group'>
              <label htmlFor='password'>New Password</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Leave blank to keep current password'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
              />
            </div>
          </>
        )}

        <div className='my-2'>
          <label>Image</label>
          <input
            type='text'
            placeholder='Enter image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input type='file' label='Choose File' onChange={uploadFileHandler} />
          {image && (
            <div className='avatar-preview'>
              <img
                src={image}
                alt='Avatar Preview'
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginTop: '10px',
                }}
              />
              <button
                type='button'
                onClick={handleDeleteAvatar}
                style={{
                  marginTop: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                Delete Avatar
              </button>
            </div>
          )}
        </div>

        <button type='submit' disabled={updating || userInfo?.googleId}>
          {updating ? <Loading /> : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile
