import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext'
import { useDarkMode } from '../Context/DarkModeContext'
// import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";


export default function Header() {

  const { darkMode, dispatch } = useDarkMode()

  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const { currentUser } = useContext(AuthContext)

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false)
    } else {
      setIsNavShowing(true)
    }
  }


  return (
    <nav className={`${darkMode ? 'nav_d' : 'nav_l'} app_transition`}>
      <div className="container nav_container">
        {/* Logo of Site */}
        <div className='Site-items'>
        <Link to='/' onClick={closeNavHandler} className="nav_logo">
          <img src={logo} alt="" />
        </Link>
        <p>Ink<small>Loom</small></p>
        </div>


        {/* User is login then Show */}
        {isNavShowing && currentUser?.user._id && <ul
          className={`${darkMode ? 'text-dark' : 'text-white'} nav_menu app_transition`}
        >
           <li>
            <Link to={`/posts`} onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link to={`/profile/${currentUser.user._id}`} onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              {currentUser?.user.name}
            </Link>
          </li>
          <li>
            <Link to='/create' onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Create Posts
            </Link>
          </li>
          <li>
            <Link to='/authors' onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Authors
            </Link>
          </li>
          <li>
            <Link to='/logout' onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Logout
            </Link>
          </li>
          <li><Link onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>
            {darkMode ? <MdLightMode className='light' /> : <MdNightlight className='dark' />}
          </Link></li>
        </ul>}


        {/* User is not login then Show */}
        {isNavShowing && !currentUser?.user._id && <ul className="nav_menu">
           <li>
            <Link to={`/posts`} onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link to='/authors' onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Authors
            </Link>
          </li>
          <li>
            <Link to='/login' onClick={closeNavHandler}
              className={`${darkMode ? 'text-white' : 'text-dark'} app_transition`}
            >
              Login
            </Link>
          </li>
          <li><Link onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>
            {darkMode ? <MdLightMode className='light' /> : <MdNightlight className='dark' />}
          </Link></li>
        </ul>}
        <button onClick={() => setIsNavShowing(!isNavShowing)} className='nav_toggle_btn'>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}
// currentUser?.id && 


