import React from 'react'
import PostAuthor from './PostAuthor'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../Context/DarkModeContext';

export default function PostItem({ postID, category, title, description, authorID, createdAt, thumbnail }) {

    const shortDesc = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    const { darkMode } = useDarkMode()

    return (
        <article className={`${darkMode ? 'post_d' : 'post_l'} post app_transition`}>
            <div className='post-thumbnail'>
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post_content">
                <Link to={`/posts/${postID}`}>
                    <h3 className={`${darkMode ? 'h_d' : 'h_l'} app_transition`}>
                        {postTitle}
                    </h3>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: shortDesc }} 
                className={`${darkMode ? 'post_p_d' : 'post_p_l'} app_transition`} />
                <div className='post_footer'>
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} 
                    className={`${darkMode ? 'btnDark_Category' : 'category'} app_transition btn`}
                    >
                        {category}
                    </Link>
                </div>
            </div>
        </article>
    )
}



{/* <Link to={{
    pathname: `/posts/${postID}`,
    state: prop
}}> */}