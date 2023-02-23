import React, {useState, useEffect} from 'react'
import './suggestions.css'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import {Profile,Login, Footer } from  '../index'

import { onAuthStateChanged } from "firebase/auth";
import { style } from '../../App';
import { auth } from '../../firebaseConfig';
import { defaultImage } from '../../assets';


const Suggestions = ({user,  profilePicture,userId}) => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [profileUrl, setProfileUrl] = useState(null);


    useEffect(() => {
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setProfileUrl(authUser?.photoURL)
        } else {
    //setProfileUrl(defaultImage)
  
        }
      });
    }, [userId]);

    // const toggleProfile = () => {
    //   if(modalContent === 'Profile')

    // }

  return (
    <div className='suggestions'>
        <div className="suggestions__header">
            <div className="suggestion__imageBox">
            <img
              alt="avatar"
              src={ profileUrl ? profileUrl : defaultImage}
              className="suggestion__ProfileAvatar"
              onClick={() => setOpenProfile(true)}
            />
            <div className="suggestion__name">
            <span className="">
            <strong>  {user}</strong>
              </span>
              <span className="suggestion__next">
              {user} | 24
            </span>
            </div>
            </div>
            <a href='#' className='suggestion__switch' onClick={() => setOpen(true)}>Switch</a>
        </div>
        <div className="suggestions__container">
          <div className="suggestions__header">
            <h3 className="suggestion__text">Suggested Followers</h3>
            <a href='/' className="suggested__link">See More</a>
          </div>
        </div>
        <div className="suggestions__profileModal">
 {/* Profile Modal */}
 <Paper>
        <Box>
          <div className="app__modal">
            <Modal
              open={openProfile}
              onClose={() => setOpenProfile(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="modal__body">
                  <Profile user={user} profilePicture={profilePicture}/>
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
        </div>
        <div className="suggestion__switch">
            {/* switch accounts modal */}
        <Paper elevation={3}>
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
                    <Login />
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
        </div>
        <Footer/>
    </div>
  )
}

export default Suggestions