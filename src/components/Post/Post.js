import React from 'react';
import './post.css'
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from '../../firebaseConfig';


const Post = ({imageUrl, caption, username, message,uid, timestamp}) => {



  const handleDelete = async () => {
    const taskDocRef = doc(db, 'posts', uid)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div className='post'>
    {/* header plus avatar */}
    <div className="post__headerContainer">
    <div className="post__header">
        <Avatar alt='avatar' src=''
        className='post__avatar'/>
         <h3>{username}</h3>
         
    </div>
    <div className="post__actionIcons">
          <DeleteIcon className='post__deleteIcon' onClick={handleDelete}/>
          <EditIcon className='post__editIcon'/>
         </div>
    </div>
    {/* image */}
    <img src={imageUrl} alt="" 
    className='post__image'/>
    {/* username and caption */}
    <h4 className='post__text'><strong>{username}</strong>: {caption}</h4>
   <div className="post__message">
   <p className='post__text'>{message}</p>
   </div>
   {/* <span className="post__timestamp">{timestamp}</span> */}
    </div>
  )
}

export default Post