import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { Button, IconButton, Paper, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { signOut } from "firebase/auth";
import "./profile.css";
import { storage } from "../../firebaseConfig";
import { Login } from "../index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { defaultImage } from "../../assets";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { style } from "../../App";

const Profile = () => {
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentUserImage, setCurrentUserImage] = useState(
    auth?.currentUser?.photoURL
  );

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser?.displayName !== null) {
        setUserId(authUser?.uid);
        setCurrentUser(authUser?.displayName);
        setEmail(authUser?.email);
      }
      if (authUser?.photoURL === "") {
        setCurrentUserImage(authUser?.photoURL);
      }

      //setCurrentUserImage(defaultImage)
    });
  }, [userId]);

  const onFileChangeHandler = (e) => {
    setCurrentFile(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  /**==================UPLOAD PHOTO */
  const onHandleUpload = (e) => {
    if (!currentFile) {
      setError("Please choose a file first!");
    } else {
      setError("");
      const storageRef = ref(storage, `/profiles/${currentFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, currentFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (err) => {
          const errorMessage = err.message;
          setError(errorMessage);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            setProgress(0);
            setPreviewImage(null);
            setCurrentFile(null);
          });
        }
      );
    }
  };

  /**=====================UPDATE PHOTO================================= */
  const onHandleUpdate = (e) => {
    if (!currentFile) {
      setError("Please choose a file first!");
    } else {
      setError("");
      const storageRef = ref(storage, `/profiles/${currentFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, currentFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (err) => {
          const errorMessage = err.message;
          setError(errorMessage);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //  setNewImageUrl(url)
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            setNewImageUrl(url);
            setProgress(0);
            setPreviewImage(null);
            setCurrentFile(null);
          });
        }
      );
    }
  };
  /**===============LOGOUT=================== */
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
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
      <div className="profile__detailsBox">
        <div className="profile__header">
          <div className="createPost__header">
            {currentFile ? (
              <Box sx={{ width: "100%", margin: "10px 0px" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            ) : null}
            <form className="profile__form">
              <div className="profile__formContainer">
                <div className="profile__ImageContainer">
                  <span className="image_label">Select Photo</span>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={onFileChangeHandler}
                    />
                    <img
                      alt="avatar"
                      src={currentUserImage ? currentUserImage : defaultImage}
                      className="profile__avatar"
                    />
                  </IconButton>
                </div>
                {previewImage && (
                  <div className="my-2">
                    <div>
                      <img
                        style={{
                          height: "200px",
                          width: "200px",
                          objectFit: "contain",
                        }}
                        className="rounded-circle"
                        src={previewImage}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
              {currentUserImage ? (
                <div className="imageUpload__button">
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: 350 }}
                    onClick={onHandleUpdate}
                    style={{ width: "200px" }}
                  >
                    update photo
                  </Button>
                </div>
              ) : (
                <div className="imageUpload__button">
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: 350 }}
                    onClick={onHandleUpload}
                    style={{ width: "200px" }}
                  >
                    upload photo
                  </Button>
                </div>
              )}
              <div className="imageUpload__error">
                <span className="text-danger">{error}</span>
              </div>
            </form>
          </div>
        </div>
        <div className="profile__details">
          <h4 className="profile__text">
            <strong>Username</strong>: {currentUser}
          </h4>
          <h4 className="profile__text">
            <strong>Email</strong>: {email}
          </h4>
          <h4 className="profile__text">
            <strong>Change Account</strong>: <a
            href="#"
            className="suggestion__switch"
            onClick={() => setOpen(true)}
          >
            Switch
          </a>
          </h4>
          
        </div>
      </div>
      <div className="suggestion__switch">
        {/* switch accounts modal */}
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
                  <div className="modal__body">
                    <Login />
                  </div>
                </Box>
              </Modal>
            </div>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
