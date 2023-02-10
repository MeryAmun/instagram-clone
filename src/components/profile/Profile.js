import React, { useState, useEffect } from 'react'
import { auth } from '../../firebaseConfig';
import Button from "@mui/material/Button";
import { signOut } from 'firebase/auth';


const Profile = () => {
const [userData, setUserData] = useState();



    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
          setUserData(user)
          const displayName = user.displayName;
          const email = user.email;
          const photoURL = user.photoURL;
          const emailVerified = user.emailVerified;
          const uid = user.uid;
        }
    }, [userData])
    //console.log(userData)

    const logOut = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
  return (
    <div>
      <Button onClick={logOut}>Log Out</Button>
    </div>
  )
}

export default Profile