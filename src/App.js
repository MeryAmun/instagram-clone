import React, { useState, useEffect } from 'react'
import './App.css';
import { Post } from './components';
import {collection, query, onSnapshot, } from 'firebase/firestore';
import {db }from './firebaseConfig';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

useEffect(() => {
 const data = query(collection(db, 'posts'));
 onSnapshot(data,(querySnapshot) => {
setPosts(querySnapshot.docs.map((doc) => ({
  id:doc.id,
 post: doc.data()
}
)))
 })
}, [])




  return (
    <div className="app">
       
     <div className="app__header">
    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"  className='app__headerImage'/>
     </div>
     <h1>Instagram</h1>
     {/* Header */}
     <div className="app__modal">
       <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
       </div>
     {/* Post */}
     {
      posts.map(({post, id}) => (
        <Post key={id} {...post}/>
      ))
     }

    </div>
  );
}

export default App;
