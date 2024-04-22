import React from 'react'
import loader from '../assets/loader.gif'

export default function Loader() {
  return (
    <div className='loader'>
        <div className='loader_image'>
            <img src={loader} alt="" />
        </div>
    </div>
  )
}
