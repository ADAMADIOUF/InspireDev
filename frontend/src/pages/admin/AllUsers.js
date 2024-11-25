import React from 'react'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/userApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import Loading from '../../components/Loading'
import Message from '../../components/Message'

const AllUsers = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        refetch() // Refetch users after deletion
        toast.success('User deleted')
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete user')
      }
    }
  }

  // Loading or Error state
  if (isLoading || loadingDelete) {
    return <Loading />
  }

  if (error) {
    return (
      <Message variant='danger'>{error.message || 'An error occurred'}</Message>
    )
  }

  return (
    <div className='container'>
      <h1>Users</h1>
      <div className='user-list'>
        {users.map((user) => (
          <div className='user-card' key={user._id}>
            <div className='user-info'>
              <div>ID: {user._id}</div>
              <div>Name: {user.username}</div>
              <div>
                Email: <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div>
               
                {user.role === 'admin' ? (
                  <FaCheck className='fa-check' />
                ) : (
                  <FaTimes className='fa-times' />
                )}
              </div>
            </div>
            <div>
              <Link to={`/admin/user/${user._id}/edit`}>
                <button className='btn btn-light'>
                  <FaEdit />
                </button>
              </Link>
              {/* Conditionally render the delete button if the logged-in user is an admin */}
              {user.role !== 'admin' && (
                <button
                  className='btn btn-danger'
                  onClick={() => deleteHandler(user._id)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUsers
