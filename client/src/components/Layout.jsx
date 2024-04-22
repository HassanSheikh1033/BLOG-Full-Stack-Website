import React from 'react';
import '../index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Authors from '../pages/Authors';
import UserProfile from '../pages/UserProfile';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import CategoryPosts from '../pages/CategoryPosts';
import AuthorPosts from '../pages/AuthorPosts';
import Dashboard from '../pages/Dashboard';
import Logout from '../pages/Logout';
import DeletePost from '../pages/DeletePost';
import PostDetail from '../pages/PostDetail';
import ErrorPage from '../pages/ErrorPage';
import AuthProvider from '../Context/AuthContext';
import Posts from './Posts';
import { useDarkMode } from '../Context/DarkModeContext';


export default function Layout() {

  const { darkMode, dispatch } = useDarkMode()

  React.useEffect(() => {
    const localStorageCheck = JSON.parse(localStorage.getItem('darkMode'))

    if (localStorageCheck) {
      dispatch({ type: 'SET_DARK_MODE', payload: localStorageCheck })
    }

    return () => { }

  }, [])

  return (
    <div className={`${darkMode ? 'dark_mode' : 'light_mode'} app_transition`}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostDetail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:id' element={<UserProfile />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/posts/categories/:category' element={<CategoryPosts />} />
            <Route path='/posts/users/:id' element={<AuthorPosts />} />
            <Route path='/myposts/:id' element={<Dashboard />} />
            <Route path='/posts/:id/edit' element={<EditPost />} />
            <Route path='/posts/:id/delete' element={<DeletePost />} />
            <Route path='/Logout' element={<Logout />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}



// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import {Outlet} from 'react-router-dom'

// export default function Layout() {
//   return (
//    <>
//        <Header/>
//         <Outlet/>
//        <Footer/>

//    </>
//   )
// }