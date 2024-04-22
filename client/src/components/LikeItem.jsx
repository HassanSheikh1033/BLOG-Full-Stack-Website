import { json, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import AuthProvider from '../context/AuthContext';


export default function LikeItem(props) {
    const [likes, setLikes] = useState(props.likes || null)
    const { id } = useParams();

    const { token } = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        console.log(token)
    }, [])

    const handleLike = async () => {
        const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        if (response.ok) {
            setLikes(data.likes)
            console.log('Post liked successfully');
        }
        else {
            console.log(json.message);
        }
    };

    

    return (
        <div className='like-box'>
            <button onClick={handleLike}><AiFillLike className='like' /></button>
            <span className='likes'>{likes && likes}</span>
        </div>
    );
};
