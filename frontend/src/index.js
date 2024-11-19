import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Loging';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import CreateBlog from './pages/CreateBlog';
import EditBlogPage from './pages/EditBlogPage';
import SearchPage from './components/SearchPage';
import SingleBlog from './pages/SingleBlog';
import AllPosts from './pages/AllPosts';
import About from './components/About';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/search/:keyword' element={<SearchPage />} />
      <Route path='/blog/:id' element={<SingleBlog />} />
      <Route path='/all-posts' element={<AllPosts />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgetPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/create-blog' element={<CreateBlog />} />

        <Route path='user/edit/:postId' element={<EditBlogPage />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      {' '}
      <RouterProvider router={router} />
   
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
