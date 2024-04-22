import React from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useState } from 'react';


export default function BookMark(props) {
    const [bookmarked, setBookmarked] = useState(props.bookmarks || false);
    const { id } = useParams()

    const { token } = JSON.parse(localStorage.getItem('user'))


    
    const handleBookmark = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}/bookmark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log("fuck")
                setBookmarked(true);
            }

        } catch (error) {
            console.error('Error bookmarking post:', error);
        }
    };


    const handleUnbookmark = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}/unbookmark`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log("nsmabdanm")
                setBookmarked(false);
            }

        } catch (error) {
            console.error('Error unbookmarking post:', error);
        }
    };



    return (
        <>
            {bookmarked ? (
                <button onClick={handleUnbookmark}>Unbookmark</button>
            ) : (
                <button onClick={handleBookmark}>Bookmark</button>
            )}
        </>
    );
}

