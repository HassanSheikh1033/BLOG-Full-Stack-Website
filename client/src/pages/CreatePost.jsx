import React from 'react'
import { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../Context/DarkModeContext'

export default function CreatePost() {

  const { darkMode } = useDarkMode()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const token = currentUser?.token
  console.log(currentUser?.token)


  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  // Arrays of Objects:
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }


  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ]


  const Post_Category = ['Uncategorized', 'Agriculture', 'Entertainment', 'Art',
    'Investment', 'Education', 'Weather', 'Business']



  //  Creating Post :
  const createPost = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);
  
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: postData
      });

      const json = await response.json()
  
      if (response.ok) {
        navigate('/posts');
      } else {
        // throw new Error('Failed to create post');
        setError(json.message);
      }
  }
  



  return (
    <section className="create-post">
      <div className="container">
        <h2 className={`${darkMode ? 'hc_d' : 'hc_l'} app_transition`}>Create Posts</h2>
        {error && <p className='form_error-message'>{error}</p>}
        <form action="" className='form create-post_form' onSubmit={createPost}>
          <input  className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
          type="text" placeholder='Title' value={title} autoFocus
            onChange={(e) => setTitle(e.target.value)} />
          <select className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
          name="Category" value={category} onChange={(e) => setCategory(e.target.value)} >
            {
              Post_Category.map((cat) => {
                return (
                  <option key={cat} >{cat}</option>
                )
              })
            }
          </select>
          <ReactQuill className={`${darkMode ? 'ql_dark' : 'ql_white'} app_transition`} 
          modules={modules} formats={formats} value={description} onChange={setDescription} />
          {/* <input type="file" placeholder='Thumbnail' value={thumbnail} accept='jpg png jpeg'
              onChange={(e) => setThumbnail(e.target.files[0])} /> */}
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
           type="text" placeholder='Enter thumbnail src' value={thumbnail} autoFocus
            onChange={(e) => setThumbnail(e.target.value)} />
          <button type='submit' className='btn primary'>Create</button>

        </form>
      </div>
    </section>
  )
}
