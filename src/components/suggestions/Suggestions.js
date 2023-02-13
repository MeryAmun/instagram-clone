import React, {useState, useEffect} from 'react'
import './suggestions.css'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {Profile,Login } from  '../index'
import { collection, query, onSnapshot,orderBy } from "firebase/firestore";

import Avatar from "@mui/material/Avatar";
import { onAuthStateChanged } from "firebase/auth";
import { style } from '../../App';
import { auth } from '../../firebaseConfig';


const Suggestions = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [userId, setUserId] = useState(null);



    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
          if (authUser) {
            setUser(authUser?.displayName);
            setUserImage(authUser?.photoURL);
            setUserId(authUser?.uid);
          } else {
            setUser(null);
          }
        });
      }, [user, userId]);
  return (
    <div className='suggestions'>
        <div className="suggestions__header">
            <div className="suggestion__imageBox">
            <Avatar
              alt="avatar"
              src={userImage}
              className="post__avatar"
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
            <Button className='suggestion__switch' onClick={() => setOpen(true)}>Switch</Button>
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
                  <Profile/>
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
    </div>
  )
}

export default Suggestions