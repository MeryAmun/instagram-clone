import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import "./profile.css";
import Avatar from '@mui/material/Avatar';

const Profile = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      setUserData(user);
      // const displayName = user.displayName;
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;
      // const uid = user.uid;
    }
  }, [userData]);
  //console.log(userData)

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="profile">
      <center>
        <div className="profile__header">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="logo"
            className="profile__headerImage"
          />
          <Button onClick={logOut}>Log Out</Button>
        </div>
      </center>
      <div className="profile__details">
      <div className="profile__header">
        <Avatar alt='avatar' src={userData.photoUrl}
        className='profile__avatar'/>
    </div>
      <h4 className='profile__text'><strong>Username</strong>: {userData?.displayName}</h4>
      <h4 className='profile__text'><strong>Email</strong>: {userData?.email}</h4>
      </div>
    </div>
  );
};

export default Profile;
