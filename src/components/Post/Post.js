import React, { useState, useEffect } from "react";
import "./post.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  setDoc,
  FieldValue,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import EditPost from "./EditPost";
import { style } from "../../App";
import { Send } from "react-feather";
import { Heart } from "react-feather";
import { MessageCircle } from "react-feather";
import { defaultImage } from "../../data/dummyData";
import { onAuthStateChanged } from "firebase/auth";
import moment from "moment";
import { Tooltip } from "@mui/material";
import { async } from "@firebase/util";

const Comment = ({
  imageUrl,
  username,
  message,
  userId,
  uid,
  timestamp,
  userProfileUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [likeId, setLikeId] = useState(null)
  const [likesCount, setLikesCount] = useState(0);
  const [shares, setShares] = useState(0);
  const [sharesCount, setSharesCount] = useState(shares);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentLikesCount, setCommentLikesCount] = useState(commentLikes);
  const [likedComment, setLikedComment] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setCurrentUserId(authUser?.uid);
        setProfileUrl(authUser?.photoURL);
        setCurrentUser(authUser.displayName);
      } else {
        setProfileUrl(defaultImage);
        setCurrentUserId(null);
        setCurrentUser(null);
      }
    });
  }, [currentUserId]);

  //**============GET COMMENTS======================================================================================= */
  useEffect(() => {
    if (uid) {
      const q = query(
        collection(db, "posts", uid, "comments"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setComments(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data(),
            // timestamp: Timestamp.fromDate(new Date().getSeconds())
          }))
        );
      });
    }
  }, [uid, username]);
  //**============GET LIKES======================================================================================= */
  useEffect(() => {
    if (uid) {
      const q = query(collection(db, "posts", uid, "likes"));
      onSnapshot(q, (querySnapshot) => {
        setLikes(querySnapshot.docs.map((doc) => doc.data()));
      });
    }

    likes?.map(({likedUserId, numOfLikes}) => {
      if(likedUserId === currentUserId){
        setLikeId(likedUserId)
      }else{
        setLikeId(null)
      }
//setLikesCount(likesCount += numOfLikes)
    });
    for(let i = 0; i < likes.length; i++){
      setLikesCount(likes.length)
      }
    
  }, [liked]);
 
console.log(likes)
console.log(likeId)
console.log(likesCount)
  //**============GETS SHARES COUNT ======================================================================================= */
  useEffect(() => {
    if (uid) {
      const q = query(collection(db, "posts", uid, "shares"));
      onSnapshot(q, (querySnapshot) => {
        setShares(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid]);
  //**============GET LIKED COMMENT======================================================================================= */
  useEffect(() => {
    if (uid) {
      const q = query(collection(db, "posts", uid, "commentLikes"));
      onSnapshot(q, (querySnapshot) => {
        setCommentLikes(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [uid]);

  //**============DELETE POST======================================================================================= */
  const handleDelete = async () => {
    const postDocRef = doc(db, "posts", uid);
    try {
      await deleteDoc(postDocRef);
    } catch (err) {
      alert(err);
    }
  };
  //**============POST COMMENT======================================================================================= */
  const postComment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts", uid, "comments"), {
        timestamp: new Date().toLocaleString(),
        text: comment,
        commentBy: currentUser,
        userId: currentUserId,
        userImage: profileUrl,
      });
      setComment("");
    } catch (err) {
      alert(err);
    }
  };
  //**============TOGGLE LIKE======================================================================================= */

  
  const toggleLike = async (e) => {
   
    try {

        if (!likeId) {
          await addDoc(collection(db, "posts", uid, "likes"), {
             numOfLikes: 1,
             postId: uid,
            likedUserId: currentUserId,
          });
          setLikesCount(likesCount + 1);
          setLiked((prev) => !prev);

        }
      else{
        //const postDocRef = doc(db, "posts", uid, "likes",likeId).id
          // await updateDoc(postDocRef, {
          //   numOfLikes: 0,
          // });
          setLikesCount(likesCount)
          // console.log(postDocRef)
          // console.log(likes)
      //  //console.log( postDocRef.id)
      //     try {
      //       await deleteDoc(postDocRef);
      //     } catch (err) {
      //       alert(err);
    
      //     }
          setLiked((prev) => !prev);
        }
        if (!currentUserId) {
          setLikesCount(likesCount);
        }
  
        // setLiked((prev) => !prev)

      

      // if(userId !== currentUserId && !liked){
      //   setLikesCount(likesCount + 1)
      //   setLiked(false)
      // }else if(userId !== currentUserId && liked){
      //   setLiked(true)
      //   setLikesCount(likesCount + 1)
      //   setLiked(false)
      // }
      // if(userId && liked){
      //   setLikesCount(likesCount - 1)
      // }else{
      //   setLikesCount(likesCount + 1)
      //   setLiked(false)
      // }
    } catch (err) {
      alert(err);
    }
  };
  //**============TOGGLE COMMENT LIKE==========================================================================*/
  // if(uid && likedComment){
  //   setCommentLikesCount(commentLikesCount - 1)
  // }else{
  //   setCommentLikesCount(commentLikesCount + 1)
  // }
  const toggleCommentLike = async () => {
    try {
      // await addDoc(collection(db, "posts", uid, "commentLikes"), {
      //   numOfCommentLikes: commentLikesCount,
      // });
      comments.map(({ text, id }, index) => {
        console.log(index, "space", id);
      });
      setLikedComment((prev) => !prev);
    } catch (err) {
      alert(err);
    }
  };

  //**============TOGGLE SHARE======================================================================================= */
  const toggleShare = async (e) => {
    try {
      await addDoc(collection(db, "posts", uid, "shares"), {
        numOfShares: sharesCount,
      });
      if (uid && shared) {
        setSharesCount(sharesCount - 1);
      } else {
        setSharesCount(sharesCount + 1);
      }
      setShared((prev) => !prev);
    } catch (err) {
      alert(err);
    }
  };

  //console.log(comments)
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
                    message={message}
                    userId={userId}
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
          <img alt="avatar" src={userProfileUrl} className="post__avatar" />
          <h3>{username}</h3>{" "}
          <strong className="post__middleDot">&middot;</strong>
          {/* <span className="post__timestamp">{newTimestamp}</span> */}
          <span className="post__timestamp">{moment(timestamp).fromNow()}</span>
        </div>
        {currentUser && currentUserId === userId ? (
          <div className="post__actionIcons">
            <Tooltip title="Delete">
              <DeleteIcon
                fontSize="12px"
                className="post__deleteIcon"
                onClick={handleDelete}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <EditIcon
                fontSize="12px"
                className="post__editIcon"
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          </div>
        ) : null}
      </div>
      {/* image */}
      <img src={imageUrl} alt="" className="post__image" />
      {/* username and caption */}
      <div className="post__reactionsContainer">
        <div className="post__reactionsHeader">
          <div className="post__reactionType">
            <Heart
              size={20}
              className={liked ? "post__reactionIconSelected" : ""}
              onClick={toggleLike}
            />
            <br />
            <span className="post__reactionCount">
              {likesCount === 1 ? likesCount + " like" : likesCount + " likes"}{" "}
            </span>
          </div>
          <div className="post__reactionType">
            <MessageCircle size={20} />
            <br />
            <span className="post__reactionCount">
              {comments.length === 1
                ? comments.length + " comment"
                : comments.length + " comments"}{" "}
            </span>
          </div>
          <div className="post__reactionType">
            <Send
              size={20}
              className={shared ? "post__reactionIconSelected" : ""}
              onClick={toggleShare}
            />
            <br />
            <span className="post__reactionCount">
              {sharesCount === 1
                ? sharesCount + " share"
                : sharesCount + " shares"}{" "}
            </span>
          </div>
        </div>
        <div className="post__message">
          <p className="post__text">
            <strong>{username}</strong>: {message}
          </p>
        </div>
      </div>

      <div className="post__reactions">
        {viewComments ? (
          <div className="post__readComments">
            {comments?.map(
              ({ text: { text, commentBy, id, userImage, timestamp } }) => (
                <div className="post__commentBox" key={id}>
                  <div className="post__commenter">
                    <img
                      src={userImage}
                      alt="avatar"
                      className="post__commentAvatar"
                    />
                    <p className="post__comment">
                      <span>
                        <strong>{commentBy}</strong>
                      </span>
                      <br />
                      {text} <br />
                      <span className="post__timestamp">
                        {moment(timestamp).fromNow()}
                      </span>
                    </p>
                  </div>
                  {currentUser ? (
                    <div className="post__reactionType">
                      <Heart
                        size={15}
                        className={
                          likedComment ? "post__reactionIconSelected" : ""
                        }
                        onClick={toggleCommentLike}
                      />
                      <span className="post__reactionCount">
                        {commentLikesCount}
                      </span>
                    </div>
                  ) : null}
                </div>
              )
            )}
          </div>
        ) : (
          <span
            className="post__viewComments"
            onClick={setViewComments((prev) => !prev)}
          >
            view comments
          </span>
        )}
        {currentUser ? (
          <div className="post__commentForm">
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
        ) : null}
      </div>
      {/* end of post reactions */}
    </div>
  );
};

export default Comment;
