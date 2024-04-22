import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react'
import { useDarkMode } from '../Context/DarkModeContext';


export default function UserProfile() {

  const { darkMode } = useDarkMode()

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')

  const [isAvatarTouched, setIsAvatarTouched] = useState(false)


  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const token = currentUser?.token

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])


  // Fetching avatar from backend...
  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false)
    try {
      const postData = new FormData()
      postData.set('avatar', avatar)
      const response = await fetch(`http://localhost:5000/api/users/change-avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: postData
      });
      const json = await response.json()
      if (response.ok) {
        setAvatar(json.avatar)
      } else {
        setError(json.message);
      }
    } catch (error) {
      console.log(error)
    }
  }


  // Fetching user details from backend to setDetails...
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      const { name, email, avatar } = data
      setName(name)
      setEmail(email)
      setAvatar(avatar)
    }
    getUser()
  }, [])



  // Submit user updated details..
  const updateUserDetails = async (e) => {
    e.preventDefault()

    // const response = await fetch(`http://localhost:5000/api/users/edit-user`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: userData
    // })
    // const json = await response.json()
    // if (response.ok) {
    //   navigate('/logout')
    //   console.log(json)
    // } else {
    //   setError(json.message)
    // }

    console.log(userData)

  }




  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.user._id}`}
          className={`${darkMode ? 'btnDark_Category2' : 'btn'} app_transition`}>
          My Posts
        </Link>

        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className={`${darkMode ? 'profile_avatar_d' : 'profile_avatar_l'} 
            profile_avatar app_transition`}>
              <img src={`http://localhost:5000/uploads/${avatar}`} alt="" />
            </div>

            {/* Form to update Avatar */}
            <form action="" className='avatar-form'>
              <input type="file" name='avatar' id='avatar' accept='jpg, png, jpeg'
                onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FaEdit /></label>
            </form>
            {isAvatarTouched &&
              <button className="profile_avatar-btn" onClick={changeAvatarHandler} >
                <FaCheck />
              </button>}
          </div>

          <div className='user_profile_heading'>
            <h1 className={`${darkMode ? 'hc_d' : 'hc_l'} app_transition`}>
              {currentUser.user.name}
            </h1>
          </div>



          {/* Form to update user details */}
          <form className="form profile_form" onSubmit={updateUserDetails}>
            {error && <p className='form_error-message'>{error}</p>}
            <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
              type="text" placeholder='Full Name' name='name' value={name}
              onChange={e => setName(e.target.value)} autoFocus />
            <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
              type="email" placeholder='Email' name='email' value={email}
              onChange={e => setEmail(e.target.value)} autoFocus />
            <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
              type="password" placeholder='Current Password' name='currentPassword'
              value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
              autoFocus />
            <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
              type="password" placeholder='New Password' name='newPassword'
              value={newPassword} onChange={e => setNewPassword(e.target.value)}
              autoFocus />
            <input className={`${darkMode ? 'input_d' : 'text-light'} app_transition`}
              type="password" placeholder='Confirm Password' name='confirmPassword'
              value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
              autoFocus />
            <button type='submit' className='btn primary'>Update Details</button>
          </form>

        </div>
      </div>
    </section>
  )
}
