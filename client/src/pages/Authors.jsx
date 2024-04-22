import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDarkMode } from '../Context/DarkModeContext'


export default function Authors() {

  const { darkMode } = useDarkMode()

  const [authors, setAuthors] = useState([])
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users`)
        const data = await response.json()
        setAuthors(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    getAuthors()

  }, [])


  if (isloading) {
    return <Loader />
  }


  return (
    <section className='authors'>
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({ _id: id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`}
              className={`${darkMode ? 'author_d' : 'author_l'} author app_transition`}
            >
              <div className={`${darkMode ? 'avatar_d' : 'avatar_l'} author_avatar app_transition`}>
                <img src={`http://localhost:5000/uploads/${avatar}`} alt={`Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4 className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
                  {name}
                </h4>
                <p className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
                  {posts}
                </p>
              </div>
            </Link>
          ))
        }
      </div> : <h1 className='center'>No Users/Authors found.</h1>}
    </section>
  )
}
