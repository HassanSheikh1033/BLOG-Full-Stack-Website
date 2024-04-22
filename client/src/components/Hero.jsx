import React, { useEffect } from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
import heroimg from '../assets/12.jpg'
import hand_icon from '../assets/hand_icon.png'
import { useDarkMode } from '../Context/DarkModeContext'


export default function Hero() {

  const { darkMode } = useDarkMode()


  return (
    <div className={`${darkMode ? 'dark_mode' : 'light_mode'} app_transition hero`}>
      <div className="hero-left">
        <h2 className={`${darkMode ? 'text-white': 'text-dark'}`}>Ultimate Writing Platform ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p className={`${darkMode ? 'text-white': 'text-dark'}`}>Get</p>
            <img src={hand_icon} alt="" />
          </div>
          <p className={`${darkMode ? 'text-white': 'text-dark'}`}>Started with</p>
          <p className={`${darkMode ? 'text-white': 'text-dark'}`}>InkLoom</p>
        </div>
        
        <div className='btn_h_container'>
          <Link to={'/register'} className="hero-latest-btn1">Register now</Link>
          <Link to={'/login'} className="hero-latest-btn2">Login</Link>
        </div>
      </div>

      <div className="hero-right">
        <img src={heroimg} alt="" />
      </div>
    </div>
  )
}
