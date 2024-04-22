import React from 'react'
import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
// import { Dummy_Posts } from '../data'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'



export default function CategoryPosts() {


  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { category } = useParams()

  useEffect(() => {
      const fetchPosts = async () => {
          setIsLoading(true)
          try {
              const response = await fetch(`http://localhost:5000/api/posts/categories/${category}`)
              const data = await response.json()
              setPosts(data)
              console.log(data)
          } catch (error) {
              console.log(error)
          }
          setIsLoading(false)
      }
      fetchPosts();
  },[category])


  if (isLoading) {
      return <Loader />
  }


  return (
      <section>
          {posts.length > 0 ? <div className='container posts_container'>
              {posts.map(({ _id, thumbnail, category, title, description, creator, createdAt }) =>
                  <PostItem key={_id} postID={_id} thumbnail={thumbnail} category={category}
                      title={title} description={description} authorID={creator} createdAt={createdAt} />
              )}
          </div> : <h2 className='center'>No Posts Found!</h2>}
      </section>
  )
}




