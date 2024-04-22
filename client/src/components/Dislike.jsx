import { json, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BiSolidDislike } from 'react-icons/bi';
import AuthProvider from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';


export default function Dislike(props) {
  const [dislikes, setDisLikes] = useState(props.dislikes || null)
  const { id } = useParams();

  const { darkMode } = useDarkMode()

  const { token } = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    console.log(token)
  }, [])

  const handleDisLike = async () => {
    const response = await fetch(`http://localhost:5000/api/posts/${id}/dislike`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (response.ok) {
      setDisLikes(data.dislikes)
      console.log('Post disliked successfully');
    }
    else {
      console.log(json.message);
    }

  };



  return (
    <div className='like-box'>
      <button onClick={handleDisLike}><BiSolidDislike className='dislike' /></button>
      <span className={`${darkMode ? 'text-white' : 'text-dark'} likes app_transition`}>
        {dislikes && dislikes}
      </span>
    </div>
  );
};
