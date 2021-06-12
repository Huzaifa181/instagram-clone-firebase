import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css'
import Post from './Post'
import {db} from './firebase'
function App() {
  const [posts, setPosts]= useState([])
  useEffect(()=>{
    db.collection('posts').onSnapshot(snap=>{
        setPosts(snap.docs.map(doc=>{
          return(
            {
              id:doc.id,
              post:doc.data()
            }
          )
        }))
    })
},[])
  return (
    <div className='app'>
      <div className="app__header">
        <img
        width={120}
        className='app__headerImage'
        src='https://th.bing.com/th/id/R5cdb4191426f52fdcc8bbdf57f53cdc2?rik=PoFNyb3OpdWS%2bA&pid=ImgRaw'/>
      </div>
      {posts?.map(({id,post})=>{
        return(
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )
      })}
      
</div>
  );
}

export default App;
