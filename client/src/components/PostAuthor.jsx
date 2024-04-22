import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar1.jpg'
import { useEffect } from 'react'
import { useDarkMode } from '../context/DarkModeContext'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(en)
TimeAgo.addDefaultLocale(ru)


function PostAuthor({ authorID, createdAt }) {

  const { darkMode } = useDarkMode()

  const [author, setAuthor] = useState({})

  useEffect(() => {
    const getAuthor = async () => {
      const response = await fetch(`http://localhost:5000/api/users/${authorID}`)
      const data = await response.json()
      setAuthor(data)
      // console.log(data)
    }

    getAuthor()
  }, [])


  return (
    <Link to={`/posts/users/${authorID}`} className='post_author'>
      <div className='post_author-avatar'>
        <img src={`http://localhost:5000/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className='post_author-details'>
        <h5 className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
          By: {author?.name}
        </h5>
        <small className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
          <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
        </small>
      </div>
    </Link>
  )
}

export default PostAuthor