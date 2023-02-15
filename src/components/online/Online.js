import React,{ useState } from 'react'
import './online.css';
import Avatar from '@mui/material/Avatar';
import {
   ArrowLeftCircle,
   ArrowRightCircle
  } from "react-feather";
import { availableOnline } from '../../data/dummyData';


const Online = () => {
    const [limit, setLimit] = useState(availableOnline.slice(0,4))
  return (
    <div className='online'>
       <ArrowLeftCircle className='online__arrows'/>
       {
        limit.map((user, index)=> (
            <div className="online__available" key={index}>
      <div className="online__imageContainer">
      <Avatar alt='avatar' src={user.img}
        className='online__image'/>
      </div>
        <span><strong className='post__middleDot'>{user.name}</strong></span> 
       </div>
        ))
       }
       <ArrowRightCircle className='online__arrows'/>
        </div>
  )
}

export default Online