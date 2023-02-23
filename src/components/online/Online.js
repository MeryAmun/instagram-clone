import React, { useState, useEffect } from "react";
import "./online.css";
import Avatar from "@mui/material/Avatar";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { availableOnline } from "../../data/dummyData";
import {
  getDatabase,
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from "firebase/database";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Online = () => {
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [online, setOnline] = useState([]);
  const length = availableOnline.length;
  const db = getDatabase();
  const myConnectionsRef = ref(db, `users/${currentUser}/connections`);
  const lastOnlineRef = ref(db, `users/${currentUser}/lastOnline`);
  const connectedRef = ref(db, ".info/connected");

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser?.displayName !== null) {
        setUserId(authUser?.uid);
        setCurrentUser(authUser?.displayName);
      }
    });
  }, [userId]);

  useEffect(() => {
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        const con = push(myConnectionsRef);
        console.log(con);
        // When I disconnect, remove this device
        onDisconnect(con).remove();

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        set(con, true);
        setOnline({ ...online, con });

        // When I disconnect, update the last time I was seen online
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      }
    });
  }, [connectedRef]);

  // console.log(myConnectionsRef)
  // console.log(lastOnlineRef)
  // console.log(connectedRef)
  const previous = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };
  const next = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };
  return (
    <div className="online">
      <ArrowLeftCircle className="online__arrows" onClick={previous} />
      {/* <div className="online__availableBox"> */}
      {availableOnline.map((user, index) => {
        return (
          <div className="online__availableContainer" key={index}>
            {/* <div className="online__available">
            <div className="online__imageContainer">
          <Avatar alt='avatar' src={user.img}
            className={index === currentIndex ? "online__active" : "online__image"}/>
          </div>
            <span><strong className='post__middleDot'>{user.name}</strong></span> 
            </div> */}
            {index === currentIndex && (
              <div className="online__available">
                <div className="online__imageContainer">
                  <img
                    alt="avatar"
                    src={user.img}
                    className={
                      index === currentIndex
                        ? "online__active"
                        : "online__image"
                    }
                  />
                </div>
                <span className="online__username">{user.name}</span>
              </div>
            )}
          </div>
        );
      })}
      {/* </div> */}
      <ArrowRightCircle className="online__arrows" onClick={next} />
    </div>
  );
};

export default Online;
