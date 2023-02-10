import React, { useState, useEffect } from 'react'
import { auth } from '../../firebaseConfig';


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
  return (
    <div>Profile</div>
  )
}

export default Profile