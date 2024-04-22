import { useParams, Link, useNavigate } from 'react-router-dom'
import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import DeletePost from './DeletePost'
import Loader from '../components/Loader'
import { useDarkMode } from '../context/DarkModeContext'
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import LikeItem from '../components/LikeItem'
import Dislike from '../components/Dislike'
import BookMark from '../components/BookMark'



export default function PostDetail() {

  const { darkMode } = useDarkMode()

  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = currentUser?.token

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {

    const getPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }

    getPosts()

  }, [])


  if (isLoading) {
    return <Loader />
  }


  return (
    <section className={`${darkMode ? 'post-detail_d' : 'post-detail_l'} app_transition post-detail`}>
      {error && <p className='error'>{error}</p>}
      {post && <div className="container post-detail_container">
        <div className="post-detail_header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
          {currentUser?.user._id == post?.creator &&
            <div className="post-detail_buttons">
              <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
              <DeletePost postId={id} />
            </div>
          }
        </div>

        <div>
          <h1>{post.title}</h1>
          <p>{post.createdAt}</p>
        </div>

        <div className="post-detail_thumbnail">
          <img src={post.thumbnail} alt="" />
        </div>

        <div className='reaction-items'>
          <div className='like-dislike'>
            <div><LikeItem likes={post.likes} /></div>
            <div><Dislike dislikes={post.dislikes} /></div>
          </div>

          <div className='items-2'>
            <div className='download'>
              <FaDownload className='download-icon' />
              <p>Download</p>
            </div>
            <div>
              <BookMark bookmarks={post.bookmarks} />
            </div>
          </div>
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
      </div>}
    </section>
  )

}