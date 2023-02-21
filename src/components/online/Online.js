import React,{ useState } from 'react'
import './online.css';
import Avatar from '@mui/material/Avatar';
import {
   ArrowLeftCircle,
   ArrowRightCircle
  } from "react-feather";
import { availableOnline } from '../../data/dummyData';
import { getDatabase, ref, onDisconnect } from "firebase/database";



const Online = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = availableOnline.length;


    const previous = () => {
setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1)
    }
    const next = () => {
setCurrentIndex(currentIndex === length - 1 ?  0 : currentIndex + 1)
    }
  return (
    <div className='online'>
       <ArrowLeftCircle className='online__arrows' onClick={previous}/>
       {/* <div className="online__availableBox"> */}
       {
        availableOnline.map((user, index) => {
          return (
            <div className="online__availableContainer" key={index}>
              {/* <div className="online__available">
            <div className="online__imageContainer">
          <Avatar alt='avatar' src={user.img}
            className={index === currentIndex ? "online__active" : "online__image"}/>
          </div>
            <span><strong className='post__middleDot'>{user.name}</strong></span> 
            </div> */}
            {
              index === currentIndex && (
                <div className="online__available">
            <div className="online__imageContainer">
          <img alt='avatar' src={user.img}
            className={index === currentIndex ? "online__active" : "online__image"}/>
          </div>
            <span className='online__username'>{user.name}</span> 
            </div>
              )
            }
           </div>
          )
        })
       }
       {/* </div> */}
       <ArrowRightCircle className='online__arrows' onClick={next}/>
        </div>
  )
}

export default Online