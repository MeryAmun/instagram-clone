import React from 'react';
import './posts.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Posts = () => {
  return (
    <div className='posts'>
    {/* header plus avatar */}
    <div className="post__header">
        <Avatar alt='avatar' src=''
        className='post__avatar'/>
         <h3>Username plus avatar</h3>
    </div>
    {/* image */}
    <img src="https://z-p3-scontent.fdla2-1.fna.fbcdn.net/v/t39.30808-6/329002068_701841874929838_4069033678554001871_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5cd70e&_nc_eui2=AeHY7wdqnkZ0mBAoWFdzPKZ0FN4UEkdjfkwU3hQSR2N-TK-Qr0cWYvS63icuUcdJa-wR0jFn-xBf0CspmLjMsh-W&_nc_ohc=4mGx9CijnHkAX_Usne6&_nc_zt=23&_nc_ht=z-p3-scontent.fdla2-1.fna&oh=00_AfARNN1TpSpgNBfyQRfV6nkqhqI_sT0KcGgjNwRQe0nH7g&oe=63E5085C" alt="" 
    className='posts__image'/>
    {/* username and caption */}
    <h4 className='posts__text'><strong>meryamun</strong>: Wow project 3</h4>
    </div>
  )
}

export default Posts