import React, { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";
import "./App.css";
import {
  Login,
  Post,
  Profile,
  Signup,
  Suggestions,
  Sidebar,
  Online,
  SmallHeader,
} from "./components";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged } from "firebase/auth";
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("Signup");
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    const current = auth.currentUser;
    setCurrentUser(current);
  }, [currentUser]);
  //console.log(currentUser.displayName, currentUser.uid)

  useEffect(() => {
    const data = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(data, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  // (
  //   <h3 className="app__signInNotice">
  //     Sorry you need to be logged in to be able to make a post
  //   </h3>
  // )
  return (
    <div className="app">
      {user ? <Sidebar /> : null}
      <div className="app__box">
        <SmallHeader user={user} userImage={userImage} open={open} close={() => setOpen(false)}/>
        {user ? <Online /> : null}
        <div className="app__container">
          {/* modal */}
         
          <div className="app__posts">
            <div className="app__postLeft">
              {/* Post */}
              <div className="app__post">
                {posts.map(({ post, id }) => (
                  <Post key={id} {...post} uid={id} />
                ))}
              </div>
            </div>
            <div className="app__postRight">
              <InstagramEmbed
                clientAccessToken="<appId>|<clientToken>"
                url="https://www.instagram.com/p/CPqNU32h0H8/"
                maxWidth={375}
                hideCaption={false}
                containerTagName="div"
                injectScript
                protocol=""
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <Suggestions user={user} userImage={userImage}/>
      ) : null
      }
    </div>
  );
}

export default App;
