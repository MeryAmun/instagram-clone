import React, { useState, useEffect } from "react";
import "./App.css";
import { Login, Post, Signup } from "./components";
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged, signOut } from 'firebase/auth';
const style = {
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
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
 onAuthStateChanged(auth, (authUser) => {
    if(authUser){
      setUser(authUser.displayName);
      setUserId(authUser.uid)
    }else{
      setUser(null)
    }
  })
  }, [user, userId])
  console.log(user, userId)


  useEffect(() => {
const current = auth.currentUser
    setCurrentUser(current)   

  }, [currentUser])
  console.log(currentUser.displayName, currentUser.uid)

  useEffect(() => {
    const data = query(collection(db, "posts"));
    onSnapshot(data, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
          className="app__headerImage"
        />
      </div>
      <h1>Instagram</h1>
      {/* modal */}
      <div className="app__modal">
       {
        user ? ( <Button onClick={logOut}>Sign Out</Button>) : ( <Button onClick={() => setOpen(true)}>Login/Register</Button>)
       }
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
                <center>
                 <span> 
                  <strong>Already have an account ?</strong></span>
                  <Button onClick={() => setForm("Login")}>Login</Button>
                </center>
                ) : (
                  <center>
                  <span> 
                    <strong>Don't yet have an account ?</strong>
                    </span>
                  <Button onClick={() => setForm("Signup")}>Signup</Button>
                  </center>
                )}
              </div>
            </div>
            <div className="modal__body">
              {form === "Signup" ? <Signup /> : <Login />}
            </div>
          </Box>
        </Modal>
      </div>
      {/* Post */}
      {posts.map(({ post, id }) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
}

export default App;
