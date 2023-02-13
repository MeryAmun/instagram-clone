import React, { useState, useEffect } from "react";
import "./App.css";
import { Login, Post, Profile, Signup, Suggestions,Sidebar } from "./components";
import { collection, query, onSnapshot,orderBy } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
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
    const data = query(collection(db, "posts"),orderBy('timestamp', 'desc'));
    onSnapshot(data, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">
    {
      user ? (
        <Sidebar/>
      ) :(
        <h3 className="app__signInNotice">
          Sorry you need to be logged in to be able to make a post
        </h3>
      )
    }
      <div className="app__box">
      <div className="app__container">
      {/* modal */}
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
                <div className="modal__header">
                  <center>
                    <div className="app__header">
                      <img
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="logo"
                        className="app__headerImage"
                      />
                    </div>
                  </center>
                  <div className="form__switchButton">
                    {form === "Signup" ? (
                      <center>
                        <span>
                          <strong>Already have an account ?</strong>
                        </span>
                        <Button onClick={() => setForm("Login")}>Login</Button>
                      </center>
                    ) : (
                      <center>
                        <span>
                          <strong>Don't yet have an account ?</strong>
                        </span>
                        <Button onClick={() => setForm("Signup")}>
                          Signup
                        </Button>
                      </center>
                    )}
                  </div>
                </div>
                <div className="modal__body">
                  {form === "Signup" ? (
                    <Signup />
                  ) : form === "Login" ? (
                    <Login />
                  ) : (
                    <Profile />
                  )}
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
      <div className="app__posts">
        {/* Post */}
      <div className="app__post">
      {posts.map(({ post, id }) => (
        <Post key={id} {...post} uid={id}/>
      ))}
      </div>
      </div>
    </div>
      </div>
      <div className="app__suggestionBox">
{
  user ? (
    <Suggestions/>
  ) : (
    <Button onClick={() => setOpen(true)}>Login</Button>
  )
 }
</div>
    </div>
  );
}

export default App;
