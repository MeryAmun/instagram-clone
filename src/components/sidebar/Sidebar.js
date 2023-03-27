import React, { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import { onAuthStateChanged } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import { CreatePost, Header, Profile } from "../index";
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
import { defaultImage } from "../../assets";

const Sidebar = ({ profilePicture, user }) => {
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUserId(authUser?.uid);
        setCurrentUser(authUser?.displayName);
        setProfileUrl(authUser?.photoURL);
      } else {
        setUserId(null);
        setCurrentUser(null);
      }
    });
  }, [userId]);

  // console.log(auth)
  return (
    <div className="sidebar">
      <div className="suggestions__profileModal">
        {/* Profile Modal */}
        <Paper className="sidebar__modal">
          <Box>
            <div className="app__modal">
              <Modal
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
              >
                <Box sx={style}>
                  <div className="modal__body">
                    <center>
                      <Profile profilePicture={profilePicture} user={userId} />
                    </center>
                  </div>
                </Box>
              </Modal>
            </div>
          </Box>
        </Paper>

        {/* create post Modal */}
        <Paper className="sidebar__modal">
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
                    <center>
                      <CreatePost
                        username={currentUser}
                        userId={userId}
                        profileUrl={profileUrl}
                      />
                    </center>
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
        <Tooltip title="Home">
          <div className="sidebar__iconBox">
            <span className="sidebar__icon">
              <Home />
            </span>
            <span className="sidebar__linkTitle">Home</span>
          </div>
        </Tooltip>
        <Tooltip title="Search">
          <div
            className="sidebar__iconBox sidebar__iconSmall"
            onClick={() => setOpenDrawer(true)}
          >
            <span className="sidebar__icon">
              <Search />
            </span>
            <span className="sidebar__linkTitle">Search</span>
          </div>
        </Tooltip>
        <Tooltip title="Explore">
          <div className="sidebar__iconBox">
            <span className="sidebar__icon">
              <Compass />
            </span>
            <span className="sidebar__linkTitle">Explore</span>
          </div>
        </Tooltip>
        <Tooltip title="Reels">
          <div className="sidebar__iconBox">
            <span className="sidebar__icon">
              <Video />
            </span>
            <span className="sidebar__linkTitle">Reels</span>
          </div>
        </Tooltip>
        <Tooltip title="Message">
          <div className="sidebar__iconBox">
            <span className="sidebar__icon">
              <Send />
            </span>
            <span className="sidebar__linkTitle">Messages</span>
          </div>
        </Tooltip>
        <Tooltip title="Notification">
          <div className="sidebar__iconBox sidebar__iconSmall">
            <span className="sidebar__icon">
              <Heart />
            </span>
            <span className="sidebar__linkTitle">Notification</span>
          </div>
        </Tooltip>
        <Tooltip title="Create post">
          <div className="sidebar__iconBox" onClick={() => setOpen(true)}>
            <span className="sidebar__icon">
              <PlusSquare />
            </span>
            <span className="sidebar__linkTitle">Create</span>
          </div>
        </Tooltip>
        <Tooltip title="Profile">
          <div
            className="sidebar__iconBox sidebar__profileBox"
            onClick={() => setOpenProfile(true)}
          >
            <img
              alt="avatar"
              src={profileUrl ? profileUrl : defaultImage}
              className="sidebar__icon sidebar__iconImage"
            />
            <span className="sidebar__linkTitle">Profile</span>
          </div>
        </Tooltip>
        <Tooltip title="More">
          <div
            className="sidebar__iconBox sidebar__iconSmall more"
            onClick={() => setOpen(true)}
          >
            <span className="sidebar__icon">
              <Menu />
            </span>
            <span className="sidebar__linkTitle">More</span>
          </div>
        </Tooltip>
        {/* <Fragment> */}
        {/* <Button onClick={() => setOpenDrawer(false)}>open</Button> */}
        {/* <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <h3>Testing 123</h3>
          </Drawer>
        </Fragment> */}
      </div>
    </div>
  );
};

export default Sidebar;
