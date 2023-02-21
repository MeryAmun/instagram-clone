import React, { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";
import "./App.css";
import {
  Post,
  Signup,
  Login,
  Suggestions,
  Sidebar,
  Online,
  SmallHeader,
  ModalComponent,
  Footer
} from "./components";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import{ Button, Box} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { defaultImage } from "./data/dummyData";
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
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [profileImageUrls, setProfileImageUrls] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState("Signup");


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
  useEffect(() => {
    const data = query(collection(db, "profiles"), orderBy("timestamp", "desc"));
    onSnapshot(data, (querySnapshot) => {
      setProfileImageUrls(
        querySnapshot.docs.map((doc) =>  doc.data(),
      )
      );
    });
  }, []);




  return (
    <div className="app">
      {user ? <Sidebar profilePicture={profileImageUrls}  user={user} userId={userId}/> : null}
      <div className="app__box">
        <SmallHeader 
       userImage={userImage}
        open={open} 
        close={() => setOpen(false)} 
        profilePicture={profileImageUrls}
         user={user} 
         userId={userId}
      />
        {user ? <div className="app__onlineSection">
        <Online />
        </div> : null}
        <div className="app__container">
          <div className="app__posts">
            <div className="app__postLeft">
              {/* Post */}
              <div className="app__post">
                {posts.map(({ post, id }) => (
                  <Post key={id} {...post} uid={id} profilePicture={profileImageUrls}/>
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
        <Suggestions 
         user={user}
        userImage={userImage} 
        userId={userId}
        profilePicture={profileImageUrls} 
        />
      ) : (
        <div className="app__suggestionBox">
          
            <div className="app__header">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
                className="app__headerImage"
              />
              
            </div>
            {/* <Button onClick={() => setOpen(true)}>Login</Button> */}
            {/* <ModalComponent open={open} close={() => setOpen(false)}> */}
         <div className="app__login">
         <Box>
            <div className="modal__header">
                <div className="app__loginHeader">
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
            <Footer/>
          </Box>
         </div>
        </div>
      )}
    </div>
  );
}

export default App;
