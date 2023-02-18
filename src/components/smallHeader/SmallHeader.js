import React, { useState,useEffect } from "react";
import { Heart, Search, X } from "react-feather";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {  Header, Login, ModalComponent, Profile, Signup } from "../index";
import "./smallHeader.css";
import { defaultImage } from "../../data/dummyData";
import { style } from "../../App";

const SmallHeader = ({user, profilePicture,userId}) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [form, setForm] = useState("Signup");
  const [profileUrl, setProfileUrl] = useState(null)


  useEffect(() => {
    profilePicture?.map(({currentUser, imageUrl}) => {
    return userId === currentUser ? setProfileUrl(imageUrl) : null
      })
     }, [userId]);

  return (
    <div className="smallHeader">
      <div className="smallHeader__head">
        <Header />
      </div>
      <div className="smallHeader__searchField">
        <input
          type="search"
          placeholder="Search"
          className="smallHeader__search"
        />
        {/* <div className="smallHeader__searchIcon">
          <Search />
        </div>
        <div className="smallHeader__closeIcon">
          <X />
        </div> */}
      </div>
      <span className="smallHeader__icon">
        <Heart size={20}/>
      </span>
      {
        user ? (
          <div className="suggestion__imageBox">
            <img
              alt="avatar"
              src={profileUrl ? profileUrl : defaultImage}
              className="smallHeader__ProfileAvatar"
              onClick={() => setOpenProfile(true)}
            />
            <ModalComponent open={openProfile} close={() => setOpenProfile(false)}>
              <Profile/>
            </ModalComponent>
           
            </div>
        ) : ( 
        <div>
          <Button onClick={() => setOpenProfile(true)}>Login</Button>
          <ModalComponent open={openProfile} close={() => setOpenProfile(false)}>
          <Box sx={style}>
            <div className="modal__header">
                <div className="app__header">
                  <img
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="logo"
                    className="app__headerImage"
                  />
                </div>
              <div className="form__switchButton">
                {form === "Signup" ? (
                  <div className="form__switchButtonContainer">
                    <span>
                      <strong>Already have an account ?</strong>
                    </span>
                    <Button onClick={() => setForm("Login")}>
                      Login
                    </Button>
                  </div>
                ) : (
                  <div className="form__switchButtonContainer">
                    <span>
                      <strong>Don't yet have an account ?</strong>
                    </span>
                    <Button onClick={() => setForm("Signup")}>
                      Signup
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="modal__body">
              {form === "Signup" ? (
                <center>
                  {" "}
                  <Signup />
                </center>
              ) : (
                <center>
                  {" "}
                  <Login />
                </center>
              )}
            </div>
          </Box>
          </ModalComponent>
        </div>
       )
      }
     
    </div>
  );
};

export default SmallHeader;
