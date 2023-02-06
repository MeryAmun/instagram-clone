import React from 'react';
import './post.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Post = ({imageUrl, caption, username}) => {
  return (
    <div className='post'>
    {/* header plus avatar */}
    <div className="post__header">
        <Avatar alt='avatar' src=''
        className='post__avatar'/>
         <h3>{username}</h3>
    </div>
    {/* image */}
    <img src={imageUrl} alt="" 
    className='post__image'/>
    {/* username and caption */}
    <h4 className='post__text'><strong>{username}</strong>: {caption}</h4>
    </div>
  )
}

export default Post