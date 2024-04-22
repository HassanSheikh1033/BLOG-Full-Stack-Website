import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'



export default function DeletePost({ postId: id}) {

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const token = currentUser?.token

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const location = useLocation()

  const removePost = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (response.ok) {
        console.log(data)
        if (location.pathname === `/myposts/${currentUser.user._id}`) {
          navigate(0)
        } else {
          navigate('/')
        }
      }
      setLoading(false)

    } catch (error) {
      console.log("Couldn't delete post.")
    }
  }

  if(loading) {
    return <Loader />
  }

  return (

    <Link className='btn sm danger' onClick={() => removePost(id)} >Delete</Link>

  )
}



