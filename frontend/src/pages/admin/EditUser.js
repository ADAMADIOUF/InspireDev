import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/userApiSlice'
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const EditUser = () => {
  const { id: userId } = useParams() // Extract userId from the URL params
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [admin, setAdmin] = useState(false)

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId)
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
  const navigate = useNavigate()

  // Set the form fields when the user data is loaded
  useEffect(() => {
    if (user) {
      setUsername(user.username) // Updated from 'name' to 'username'
      setEmail(user.email)
      setAdmin(user.role === 'admin') // Updated from 'isAdmin' to 'admin'
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const role = admin ? 'admin' : 'user' // Set role based on checkbox
      await updateUser({ userId, username, email, role }) // Use 'role' instead of 'isAdmin'
      toast.success('User updated successfully')
      navigate('/admin/all-users') // Redirect to user list after successful update
    } catch (error) {
      toast.error(
        error?.data?.message || error.error || 'Failed to update user'
      )
    }
  }


  if (isLoading || loadingUpdate) {
    return <Loading />
  }

  if (error) {
    return (
      <Message variant='danger'>{error.message || 'An error occurred'}</Message>
    )
  }

  return (
    <div className='container'>
      <h1>Edit User</h1>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>{' '}
          {/* Updated from 'name' to 'username' */}
          <input
            type='text'
            id='username'
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Updated from 'name' to 'username'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='admin'>Admin</label>{' '}
          {/* Updated from 'isAdmin' to 'admin' */}
          <input
            type='checkbox'
            id='admin'
            checked={admin} // Updated from 'isAdmin' to 'admin'
            onChange={(e) => setAdmin(e.target.checked)} // Updated from 'isAdmin' to 'admin'
          />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          disabled={loadingUpdate}
        >
          {loadingUpdate ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  )
}

export default EditUser
