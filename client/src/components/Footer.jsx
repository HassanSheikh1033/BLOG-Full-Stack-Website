import React from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../Context/DarkModeContext'

export default function Footer() {

  const { darkMode } = useDarkMode()

  return (
    <footer className={`${darkMode ? 'footer_dark' : 'footer_light'} app_transition`}>
      <ul className='footer_categories'>
        <li>
          <Link to='/posts/categories/Agriculture'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Agriculture
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Business'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Business
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Education'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Education
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Entertainment'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Entertainment
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Art'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Art
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Investment'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Investment
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Uncategorized'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Uncategorized
          </Link>
        </li>
        <li>
          <Link to='/posts/categories/Weather'
            className={`${darkMode ? 'btn_d' : 'btn_l'} app_transition`}
          >
            Weather
          </Link>
        </li>
      </ul>

      <div className={`${darkMode ? 'copyright_d' : 'copyright_l'} footer_copyright app_transition`}>
        <small>All Rights Reserved | SyCo_Assassin@2024</small>
      </div>
    </footer>
  )
}
