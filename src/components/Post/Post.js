import React, { useState, useEffect } from "react";
import "./post.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebaseConfig";
import EditPost from "./EditPost";
import { style } from "../../App";
import { Send } from "react-feather";
import { Heart } from "react-feather";
import { MessageCircle } from "react-feather";

const Comment = ({ imageUrl, caption, username, message, uid, timestamp }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [comment, setComment] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
 


  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser?.displayName);
        setUserImage(authUser?.photoURL);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const handleDelete = async () => {
    const taskDocRef = doc(db, "posts", uid);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="post">
      {/* Profile Modal */}
      <Paper>
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
                  <EditPost
                    imageUrl={imageUrl}
                    caption={caption}
                    username={username}
                    message={message}
                    uid={uid}
                  />
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
      {/* header plus avatar */}
      <div className="post__headerContainer">
        <div className="post__header">
          <Avatar alt="avatar" src="" className="post__avatar" />
          <h3>{username}</h3>{" "}
          <strong className="post__middleDot">&middot;</strong>
          <span className="post__timestamp">2d</span>
        </div>
        {user ? (
          <div className="post__actionIcons">
            <DeleteIcon className="post__deleteIcon" onClick={handleDelete} />
            <EditIcon
              className="post__editIcon"
              onClick={() => setOpen(true)}
            />
          </div>
        ) : null}
      </div>
      {/* image */}
      <img src={imageUrl} alt="" className="post__image" />
      {/* username and caption */}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      <div className="post__message">
        <p className="post__text">{message}</p>
      </div>
      {/* <span className="post__timestamp">{timestamp}</span> */}
      <div className="post__reactions">
        <div className="post__reactionsHeader">
          <div className="post__reactionType">
            <Heart />
            <span className="post__reactionCount">20</span>
          </div>
          <div className="post__reactionType">
            <MessageCircle />
            <span className="post__reactionCount">20</span>
          </div>
          <div className="post__reactionType">
            <Send />
            <span className="post__reactionCount">20</span>
          </div>
        </div>
        <div className="post__readComments">
            <span>comments</span>
            <span>comments</span>
            <span>comments</span>
            <span>comments</span>
          </div>
          <div className="post__comment">
          <TextField
            type="text"
            name="comment"
            label="comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            variant="outlined"
            className="post__commentText"
          />
          <button type="submit">post</button>
          </div>
      </div>
      {/* end of post reactions */}
    </div>
  );
};

export default Comment;
