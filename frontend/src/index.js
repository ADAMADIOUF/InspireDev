import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Loging'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/HomePage'
import CreateBlog from './pages/CreateBlog'
import EditBlogPage from './pages/EditBlogPage'
import SearchPage from './components/SearchPage'
import SingleBlog from './pages/SingleBlog'
import AllPosts from './pages/AllPosts'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import MyBlog from './pages/MyBlog'
import AdminRoute from './components/AdminRoute'
import Dashboard from './pages/admin/Dashboard'
import AllPostsAdmin from './pages/admin/AllPostsAdmin'
import AllUsers from './pages/admin/AllUsers'
import EditUser from './pages/admin/EditUser'
import { GoogleOAuthProvider } from '@react-oauth/google'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/search/:keyword' element={<SearchPage />} />
      <Route path='/blog/:id' element={<SingleBlog />} />
      <Route path='/all-posts' element={<AllPosts />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgetPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />

      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/create-blog' element={<CreateBlog />} />
        <Route path='/update/:postId' element={<EditBlogPage />} />
        <Route path='/user/my-blog' element={<MyBlog />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/all-posts' element={<AllPostsAdmin />} />
        <Route path='/admin/all-users' element={<AllUsers />} />
        <Route path='/admin/user/:id/edit' element={<EditUser />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    
      <RouterProvider router={router} />
    
  </Provider>
)

reportWebVitals()
