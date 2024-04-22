import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { useDarkMode } from '../Context/DarkModeContext'


export default function Login() {

  const { darkMode } = useDarkMode()

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })


  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Using AuthContext....
  const { setCurrentUser } = useContext(AuthContext)

  // Fetching Response from Backend..
  const loginUser = async (e) => {
    e.preventDefault()
    setError('')

    const response = await fetch(`http://localhost:5000/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const json = await response.json()

    if (response.ok) {
      setCurrentUser(json)
      console.log(json)
      navigate('/posts')
    } else {
      console.log(json.message)
      setError(json.message)
    }
  }

  const handleSubmit = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Login</h2>
        <form className='form login_form' onSubmit={loginUser} action="">
          {error && <p className='form_error-message'>
            {error}
          </p>}
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
          type="text" placeholder='Email' name='email' value={userData.email}
            onChange={handleSubmit} autoFocus />
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
          type="password" placeholder='Password' name='password' value={userData.password}
            onChange={handleSubmit} autoFocus />
          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  )
}
