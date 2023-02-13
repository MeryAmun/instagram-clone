import React, { useState, useEffect,Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Drawer from '@mui/material/Drawer';
import { onAuthStateChanged } from "firebase/auth";
import { CreatePost, Header } from "../index";
import {
  Home,
  PlusSquare,
  Send,
  Compass,
  Heart,
  Video,
  Search,
  Menu,
} from "react-feather";
import "./sidebar.css";
import { style } from "../../App";
import { auth } from "../../firebaseConfig";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
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

  return (
    <div className="sidebar">
      <div className="suggestions__profileModal">
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
                    <CreatePost />
                  </div>
                </Box>
              </Modal>
            </div>
          </Box>
        </Paper>
      </div>
      <div className="sidebar__header">
        <Header />
      </div>
      <div className="sidebar__icons">
        <div className="sidebar__iconBox">
          <span className="sidebar__icon">
            <Home />
          </span>
          <span>Home</span>
        </div>

        <div className="sidebar__iconBox" onClick={() => setOpenDrawer(true)}>
          <span className="sidebar__icon">
            <Search />
          </span>
          <span>Search</span>
        </div>

        <div className="sidebar__iconBox">
          <span className="sidebar__icon">
            <Compass />
          </span>
          <span>Explore</span>
        </div>

        <div className="sidebar__iconBox">
          <span className="sidebar__icon">
            <Video />
          </span>
          <span>Reels</span>
        </div>

        <div className="sidebar__iconBox">
          <span className="sidebar__icon">
            <Send />
          </span>
          <span>Messages</span>
        </div>

        <div className="sidebar__iconBox">
          <span className="sidebar__icon">
            <Heart />
          </span>
          <span>Notification</span>
        </div>

        <div className="sidebar__iconBox" onClick={() => setOpen(true)}>
          <span className="sidebar__icon">
            <PlusSquare />
          </span>
          <span>Create</span>
        </div>
        <div className="sidebar__iconBox">
        <Avatar alt='avatar' src={userImage}
        className='sidebar__icon sidebar__iconImage'/>
        <span>Profile</span> 
    </div>
    <div className="sidebar__iconBox" onClick={() => setOpen(true)}>
          <span className="sidebar__icon">
            <Menu />
          </span>
          <span>More</span>
        </div>
        <Fragment>
          <Button onClick={() => setOpenDrawer(false)}>open</Button>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
           <h3>Testing 123</h3>
          </Drawer>
        </Fragment>
      </div>
    </div>
  );
};

export default Sidebar;
