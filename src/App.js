import React, { useState, useEffect } from 'react'
import './App.css';
import { Post } from './components';
import {collection, query, onSnapshot, } from 'firebase/firestore';
import db from './firebaseConfig';

function App() {
  const [posts, setPosts] = useState([]);

useEffect(() => {
 const data = query(collection(db, 'posts'));
 onSnapshot(data,(querySnapshot) => {
setPosts(querySnapshot.docs.map((doc) => (
  doc.data()
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
     {/* Post */}
     {
      posts.map((post, index) => (
        <Post key={index} {...post}/>
      ))
     }

    </div>
  );
}

export default App;
