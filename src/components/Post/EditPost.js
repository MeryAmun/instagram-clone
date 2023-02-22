import React, { useState, useEffect } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import "./createPost.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const EditPost = ({ imageUrl, message, uid,userId }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [newMessage, setNewMessage] = useState(message);
  const [newUrl, setNewUrl] = useState(imageUrl);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
onAuthStateChanged(auth,(authUser) => {
  if (authUser) {
    setCurrentUserId(authUser?.uid);
  } else {
    setCurrentUserId(null);
  }
  })
  }, [])
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "posts", uid);
   if(uid && currentUserId === userId){
    try {
      await updateDoc(taskDocRef, {
        message: newMessage,
        imageUrl: newUrl,
      });
      //onClose()
    } catch (err) {
      alert(err);
    }
   }
  };
  const onFileChangeHandler = (e) => {
    setCurrentFile(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    // onHandleUpload()
  };
//   const onHandleUpload = () => {
//     const storageRef = ref(storage, `/images/${currentFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, currentFile);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const percent = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(percent);
//       },
//       (err) => {
//         const errorMessage = err.message;
//         setError(errorMessage);
//       },
//       async () => {
//         await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//          setNewUrl(url)
//           setProgress(0);
//            setCurrentFile(null)
//           setPreviewImage(null);
//         });
//       }
//     );
//   };
// console.log(newUrl)
  return (
    <div className="createPost">
      <div className="createPost__header">
        <Box sx={{ width: "15%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </div>
      <form>
        <div className="">
          <div className="image__container">
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
              <PhotoCamera />
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
        <center>
          {/* <div className="imageUpload__caption">
            <TextField
              type="text"
              name="caption"
              label="Enter Caption..."
              onChange={(e) => setNewCaption(e.target.value)}
              value={newCaption}
              variant="outlined"
              className="imageUpload__caption"
            />
          </div> */}
          <div className="imageUpload__messageContainer">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={6}
              cols={10}
              placeholder="Message"
              className="imageUpload__message"
              name="message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>
        </center>
        <div className="imageUpload__button">
          <Button
            type="button"
            variant="contained"
            sx={{ width: 350 }}
            onClick={handleUpdate}
            style={{ width: "200px" }}
          >
            Edit
          </Button>
        </div>
        <div className="imageUpload__error">
          <span className="text-danger">{error}</span>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
