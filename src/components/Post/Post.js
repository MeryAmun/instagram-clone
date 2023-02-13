import React, { useState,useEffect } from 'react';
import './post.css'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { doc,  deleteDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db,auth } from '../../firebaseConfig';
import EditPost from './EditPost';
import { style } from '../../App';
import { Send } from 'react-feather';
import { Heart } from 'react-feather';
import { MessageCircle } from 'react-feather';

const Post = ({imageUrl, caption, username, message,uid, timestamp}) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
   onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser?.displayName);
        setUserImage(authUser?.photoURL);
      } else {
        setUser(null);
      }
    });
  }, [user]);

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
         {/* Profile Modal */}
         <Paper>
        <Box>
          <div className="app__modal">
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="modal__body">
                 <EditPost imageUrl={imageUrl} 
                 caption={caption} username={username}
                  message={message} 
                  uid={uid}/>
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
    {/* header plus avatar */}
    <div className="post__headerContainer">
    <div className="post__header">
        <Avatar alt='avatar' src=''
        className='post__avatar'/>
        <h3>{username}</h3> <strong className='post__middleDot'>&middot;</strong>
        <span className="post__timestamp">2d</span>
         
    </div>
   {
    user ? (
      <div className="post__actionIcons">
      <DeleteIcon className='post__deleteIcon' onClick={handleDelete}/>
      <EditIcon className='post__editIcon' onClick={() => setOpen(true)}/>
     </div>
    ) : null
   }
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