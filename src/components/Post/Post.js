import React, { useState, useEffect } from "react";
import "./post.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { collection,query,onSnapshot,orderBy,addDoc, doc, deleteDoc , serverTimestamp, Timestamp} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import EditPost from "./EditPost";
import { style } from "../../App";
import { Send } from "react-feather";
import { Heart } from "react-feather";
import { MessageCircle } from "react-feather";
import { defaultImage } from "../../data/dummyData";
import { onAuthStateChanged } from "firebase/auth";

const Comment = ({ imageUrl, username, message,userId, uid, timestamp, userImageUrl,profilePicture }) => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState(0);
  const [likesCount, setLikesCount] = useState(likes)
  const [shares, setShares] = useState(0);
  const [sharesCount, setSharesCount] = useState(shares);
  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [commentLikes, setCommentLikes] = useState(0)
  const [commentLikesCount, setCommentLikesCount] = useState(commentLikes);
  const [likedComment, setLikedComment] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);


   useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setCurrentUserId(authUser?.uid);
        setCurrentUser(authUser.displayName)
      } else {
        setCurrentUserId(null);
        setCurrentUser(null)
      }
    });
  }, [currentUserId]);

    /**=======================GET PROFILE PICTURE========================== */

    useEffect(() => {
      profilePicture?.map(({ currentUser, imageUrl }) => {
        if (currentUserId === currentUser) {
          return setProfileUrl(imageUrl);
        }
        if ((imageUrl = "")) {
          return setProfileUrl(defaultImage);
        }
      });
    }, [currentUserId,currentUser]);
  

  /**========================TIMESTAMP=================================== */
 let newTimestamp;
 const convertDate = (time) =>  {
    //time should be server timestamp seconds only
    let dateInMillis = time * 1000
    let date = new Date(dateInMillis)
  newTimestamp = date.toDateString();
    let myDay = date.toLocaleDateString()
    let myDate = date.toLocaleDateString()
    let myTime = date.toLocaleTimeString()
    myDate = myDate.replaceAll('/', '-')
    return  myDate + " " + myTime
    }
   convertDate(timestamp)
   //**============GET COMMENTS======================================================================================= */
  useEffect(() => {

    if (uid) {
      const q = query(
        collection(db, "posts", uid, "comments"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setComments(querySnapshot.docs.map((doc) => ({
          id:doc.id,
          text:doc.data(),
          // timestamp: Timestamp.fromDate(new Date().getSeconds())
        })));
      });
    }
  }, [uid,username])
   //**============GET LIKES======================================================================================= */
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

   //**============GETS SHARES COUNT ======================================================================================= */
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
   //**============GET LIKED COMMENT======================================================================================= */
  useEffect(() => {

    if (uid) {
      const q = query(
        collection(db, "posts", uid, "commentLikes"),
      );
      onSnapshot(q, (querySnapshot) => {
        setCommentLikes(querySnapshot.docs.map((doc) => doc.data()))
      });
    }
  }, [uid])
 
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
        timestamp: serverTimestamp(),
        text: comment,
        commentBy:currentUser,
        imageUrl: profileUrl,
        userId:currentUserId
      });
      setComment("");
    } catch (err) {
      alert(err);
    }
  };
  //**============TOGGLE LIKE======================================================================================= */
  const toggleLike = async (e) => {
    try {
      await addDoc(collection(db, "posts", uid, "likes"), {
        numOfLikes: likesCount,
      });
      if(uid && liked){
        setLikesCount(likesCount - 1)
      }else{
        setLikesCount(likesCount + 1)
      }
     setLiked((prev) => !prev )
    } catch (err) {
      alert(err);
    }
  };
  //**============TOGGLE COMMENT LIKE==========================================================================*/

  const toggleCommentLike = async (e) => {
    try {
      await addDoc(collection(db, "posts", uid, "commentLikes"), {
        numOfCommentLikes: commentLikesCount,
      });
      if(uid && likedComment){
        setCommentLikesCount(commentLikesCount - 1)
      }else{
        setCommentLikesCount(commentLikesCount + 1)
      }
     setLikedComment((prev) => !prev )
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
      if(uid && shared){
        setSharesCount(sharesCount - 1)
      }else{
        setSharesCount(sharesCount + 1)
      }
     setShared((prev) => !prev )
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
          <img alt="avatar" src={userImageUrl}className="post__avatar" />
          <h3>{username}</h3>{" "}
          <strong className="post__middleDot">&middot;</strong>
          <span className="post__timestamp">{newTimestamp}</span>
        </div>
        {currentUser && currentUserId === userId ? (
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
            <Heart size={20} className={liked ? 'post__reactionIconSelected' : ''} onClick={toggleLike}/>
            <br />
            <span className="post__reactionCount">{likesCount === 1 ? likesCount + ' like' : likesCount + ' likes'} </span>
          </div>
          <div className="post__reactionType">
            <MessageCircle size={20}/>
            <br />
            <span className="post__reactionCount">{comments.length === 1 ? comments.length + ' comment' : comments.length + ' comments'} </span>
          </div>
          <div className="post__reactionType">
            <Send size={20} className={shared ? 'post__reactionIconSelected' : ''} onClick={toggleShare}/>
            <br />
            <span className="post__reactionCount">{sharesCount === 1 ? sharesCount + ' share' : sharesCount + ' shares'} </span>
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
         
            comments?.map(({text:{imageUrl,text,commentBy}},index) => (
             <div className="post__commentBox" key={index}>
              <div className="post__commenter">
              <img src={imageUrl} alt="avatar" className="post__commentAvatar" />
              <p className="post__comment">
                <span><strong>{commentBy}</strong></span><br />
                {text}</p>
              {/* <span>{console.log(timestamp?.timestamp.seconds)}</span> */}
              </div>
            {
              currentUser ? (
                <div className="post__reactionType">
                <Heart size={15} className={likedComment ? 'post__reactionIconSelected' : ''} onClick={toggleCommentLike}/>
                <span className="post__reactionCount">{commentLikesCount}</span>
              </div>
              ) : null
            }
             </div>
            ))
           }
          </div>
          {
            currentUser ? (
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
            ) : null
          }
      </div>
      {/* end of post reactions */}
    </div>
  );
};

export default Comment;
