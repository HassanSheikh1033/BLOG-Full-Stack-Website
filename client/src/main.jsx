import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import { DarkModeProvider } from './Context/DarkModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
    <Layout />
    </DarkModeProvider>
  </React.StrictMode>
);




// import { RouterProvider,createBrowserRouter } from 'react-router-dom'
// import ErrorPage from './pages/ErrorPage.jsx'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import Home from './pages/Home.jsx'
// import './index.css'
// import Layout from './components/Layout.jsx'
// import PostDetail from './pages/PostDetail.jsx'
// import Authors from './pages/Authors.jsx'
// import CreatePost from './pages/CreatePost.jsx'
// import UserProfile from './pages/UserProfile.jsx'
// import Register from './pages/Register.jsx'
// import Login from './pages/Login.jsx'
// import EditPost from './pages/EditPost.jsx'
// import CategoryPosts from './pages/CategoryPosts.jsx'
// import AuthorPosts from './pages/AuthorPosts.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import Logout from './pages/Logout.jsx'
// import DeletePost from './pages/DeletePost.jsx'
// import AuthProvider from './Context/AuthContext'



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthProvider><Layout /></AuthProvider>,
//     errorElement: <ErrorPage />,
//     children: [
//       {index:true, element:<Home />},
//       {path: '/posts/:id', element:<PostDetail />},
//       {path: '/register', element:<Register />},
//       {path: '/login', element:<Login />},
//       {path: '/profile/:id', element:<UserProfile />},
//       {path: '/authors', element:<Authors />},
//       {path: '/create', element:<CreatePost />},
//       {path: '/posts/categories/:category', element:<CategoryPosts />},
//       {path: '/posts/users/:id', element:<AuthorPosts />},
//       {path: '/myposts/:id', element:<Dashboard />},
//       {path: '/posts/:id/edit', element:<EditPost />},
//       {path: '/posts/:id/delete', element:<DeletePost />},
//       {path: '/Logout', element:<Logout />},
      
//     ]
//   }
// ]) 

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <RouterProvider router={router} />  
//   </React.StrictMode>,
// )