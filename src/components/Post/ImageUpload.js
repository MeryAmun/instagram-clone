import React, { useState, useEffect } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import "./imageUpload.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ImageUpload = ({ username }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   setProgress((oldProgress) => {
  //     if (oldProgress === 100) {
  //       return 0;
  //     }
  //     const diff = Math.random() * 10;
  //     return Math.min(oldProgress + diff, 100);
  //   });
  // }, []);

  const onFileChangeHandler = (e) => {
    setCurrentFile(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onHandleUpload = () => {
    if (!currentFile) {
      setError("Please choose a file first!");
    } else {
      setError("");
      const storageRef = ref(storage, `/images/${currentFile.name}`);
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
            addDoc(collection(db, "posts"), {
              timestamp: serverTimestamp(),
              caption: caption,
              message: message,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCurrentFile(null)
            setCaption('')
            setMessage('')
            setPreviewImage(null)
          });
        }
      );
    }
  };

  return (
    <div className="createPost">
      <div className="createPost__header">
        <Box sx={{ width: "15%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </div>
      <form>
        <div className="imageUpload__caption">
          <TextField
            type="text"
            name="caption"
            label="Enter Caption..."
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            variant="outlined"
          />
        </div>
        <div className="">
          <div className="image__container">
            <span className="unit_labels">Select Photo</span>
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
        <div className="imageUpload__messageContainer">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Message"
            className="imageUpload__message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        </center>
        <div className="imageUpload__button">
          <Button
            type="button"
            variant="contained"
            sx={{ width: 350 }}
            onClick={onHandleUpload}
            style={{ width: "200px" }}
          >
            Post
          </Button>
        </div>
        <div className="imageUpload__error">
          <span className="text-danger">{error}</span>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
