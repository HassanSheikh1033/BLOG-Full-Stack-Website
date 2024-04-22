import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export default function Logout() {

  const { setCurrentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Update currentUser state after component has rendered
    setCurrentUser(null);
    // navigate('/login', { replace: true });
    navigate('/', { replace: true });
  }, [setCurrentUser, navigate]);

  return (
    <></>
  )
}
