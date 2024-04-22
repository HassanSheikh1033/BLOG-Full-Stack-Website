import React, { useState, useEffect, useContext } from 'react'
import { Dummy_Posts } from '../data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import { useDarkMode } from '../Context/DarkModeContext'

export default function Dashboard() {

  const { darkMode } = useDarkMode()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const token = currentUser?.token

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/posts/users/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    }

    fetchPosts();

  }, [id])


  if (loading) {
    return <Loader />
  }



  return (
    <section className='dashboard'>
      {
        posts.length ? <div className="container dashboard_container">
          {
            posts.map(post => {
              return (
                <article key={post._id}
                  className={`${darkMode ? 'dash_dark' : 'dash_light'} dashboard_posts app_transition`}
                >
                  <div className="dashboard_posts-info">
                    <div className="dashboard_posts-thumbnail">
                      <img src={post.thumbnail} alt="" />
                    </div>
                    <h5 className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
                      {post.title}
                    </h5>
                  </div>
                  <div className="dashboard_posts-actions">
                    <Link to={`/posts/${post._id}`}
                      className={`${darkMode ? 'btnDark3' : 'btn sm'} app_transition`}>
                      View
                    </Link>
                    <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                    {/* <Link to={`/posts/${post._id}/delete`} className='btn sm danger'>Delete</Link> */}
                    <DeletePost postId={post._id} />
                  </div>
                </article>
              )
            })
          }
        </div> : <h2 className='center'>You have no posts yet.</h2>
      }
    </section>
  )
}
