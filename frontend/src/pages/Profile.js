import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useProfileMutation } from '../slices/userApiSlice'
import { useUploadPostImageMutation } from '../slices/blogApiSlice'
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
  const [avatar, setAvatar] = useState('')
  const [updateProfile, { isLoading: updating }] = useProfileMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      setUserName(userInfo.username || '')
      setEmail(userInfo.email || '')
      setAvatar(userInfo.avatar || '')
    }
  }, [userInfo, navigate])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setAvatar(res.avatar)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteAvatar = () => {
    setAvatar('')
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
        avatar,
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
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
            required
          />
        </div>

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
        <div className='my-2'>
          <label>Image</label>
          <input
            type='text'
            placeholder='Enter image URL'
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <input type='file' label='Choose File' onChange={uploadFileHandler} />
          {avatar && (
            <div className='avatar-preview'>
              <img
                src={avatar}
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
        <button type='submit' disabled={updating}>
          {updating ? <Loading /> : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile
