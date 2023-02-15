import React, { useState, useEffect } from "react";
import "./post.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { collection,query,onSnapshot,orderBy,addDoc, doc, deleteDoc , serverTimestamp} from "firebase/firestore";
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
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState();
  const [shares, setShares] = useState();
  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)

 


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
   
  useEffect(() => {

    if (uid) {
      const q = query(
        collection(db, "posts", uid, "comments"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setComments(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid])
  useEffect(() => {

    if (uid) {
      const q = query(
        collection(db, "posts", uid, "likes"),
      );
      onSnapshot(q, (querySnapshot) => {
        setLikes(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid])
  useEffect(() => {

    if (uid) {
      const q = query(
        collection(db, "posts", uid, "shares"),
      );
      onSnapshot(q, (querySnapshot) => {
        setShares(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid])
 
  //post__reactionIconSelected
  const handleDelete = async () => {
    const taskDocRef = doc(db, "posts", uid);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts", uid, "comments"), {
        timestamp: serverTimestamp(),
        text: comment,
        imageUrl: imageUrl,
      });
      setComment("");
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
            <DeleteIcon fontSize="12px" className="post__deleteIcon" onClick={handleDelete} />
            <EditIcon fontSize="12px"
              className="post__editIcon"
              onClick={() => setOpen(true)}
            />
          </div>
        ) : null}
      </div>
      {/* image */}
      <img src={imageUrl} alt="" className="post__image" />
      {/* username and caption */}
      <div className="post__reactionsContainer">
      <div className="post__reactionsHeader">
          <div className="post__reactionType">
            <Heart size={20}/>
            <br />
            <span className="post__reactionCount">{likes?.length === 1 ? likes?.length + ' like' : likes?.length + ' likes'} </span>
          </div>
          <div className="post__reactionType">
            <MessageCircle size={20}/>
            <br />
            <span className="post__reactionCount">{comments.length === 1 ? comments.length + ' comment' : comments.length + ' comments'} </span>
          </div>
          <div className="post__reactionType">
            <Send size={20}/>
            <br />
            <span className="post__reactionCount">{shares?.length === 1 ? shares?.length + ' share' : shares?.length + ' shares'} </span>
          </div>
          </div>
          <div className="post__message">
        <p className="post__text"><strong>{username}</strong>: {message}</p>
      </div>
      </div>
      
      {/* <span className="post__timestamp">{timestamp}</span> */}
      <div className="post__reactions">
          <div className="post__readComments">
           {
            comments.map(({text, imageUrl, timestamp}) => (
             <div className="post__commentBox">
               <img src={imageUrl} alt="avatar" className="post__commentAvatar" />
              <span className="post__comment">{text}</span>
             </div>
            ))
           }
          </div>
          <div>
          <form onSubmit={postComment}>
          <input
            type="text"
            name="comment"
            placeholder="Add a comment..."
            label="comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            variant="outlined"
            className="post__commentText"
          />
          </form>
        </div>
      </div>
      {/* end of post reactions */}
    </div>
  );
};

export default Comment;
