import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDarkMode } from '../Context/DarkModeContext'



export default function Register() {

  const { darkMode} = useDarkMode()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const handleSubmit = (e) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }


  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Fetching Response from Backend..
  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    console.log(userData)

    const response = await fetch(`http://localhost:5000/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const json = await response.json()

    if (response.ok) {
      console.log(json)
      navigate('/login')
    } else {
      console.log(json.message)
      setError(json.message)
    }
  }


  return (
    <section className='register'>
      <div className="container">
        <h2>Register</h2>
        <form className='form register_form' onSubmit={registerUser} action="">
          {error && <p className='form_error-message'>
            {error}
          </p>}
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
            type="text" placeholder='Full Name' name='name' value={userData.name}
            onChange={handleSubmit} autoFocus />
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
            type="text" placeholder='Email' name='email' value={userData.email}
            onChange={handleSubmit} />
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
            type="password" placeholder='Password' name='password' value={userData.password}
            onChange={handleSubmit} />
          <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
            type="password" placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword}
            onChange={handleSubmit} />
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>You have Already an account? <Link to='/Login'>Sign in</Link></small>
      </div>
    </section>
  )
}

















// setError('')
// try {
//   const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
//   const newUser = await response.data
//   console.log(newUser)
//   if (!newUser) {
//     setError("Couldn't register user. Please try again.")
//   }
//   navigate('/login')
// } catch (err) {
//   setError(err.response.data.message)
// if (err.response && err.response.data && err.response.data.message) {
//   setError(err.response.data.message);
// } else {
//   setError("An unexpected error occurred. Please try again later.");
// }
// }