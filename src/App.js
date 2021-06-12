import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {makeStyles} from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import Post from './Post'
import {db,auth} from './firebase'
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes=useStyles()
  const [posts, setPosts]= useState([])
  const [open, setOpen]= useState(false)
  const [openSignIn, setOpenSignIn]= useState(false)
  const [username, setUsername]= useState('')
  const [user, setUser]= useState(null)
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged(authUser=>{
      if(authUser){
        console.log(authUser)
        setUser(authUser)
      }
      else{
        setUser(null)
      }
    })
    return ()=>{
      unsubscribe()
    }
  }, [user, username]);
  const signup=(e)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser=>{
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch(err=>alert(err.message))
    setOpen(false)
  }
  const handleClose=()=>{
    setOpen(false)
  }
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

  const signin=(event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .catch(err=>alert(err.message))
    setOpenSignIn(false)
  }
  return (
    <div className='app'>
      <Modal
        open={open}
        onClose={handleClose}
      >
        
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
          <center>
          <img
        width={120}
        className='app__headerImage'
        src='https://th.bing.com/th/id/R5cdb4191426f52fdcc8bbdf57f53cdc2?rik=PoFNyb3OpdWS%2bA&pid=ImgRaw'/>
        </center>
        <Input 
        type='text'
        placeholder="username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
        />
        <Input 
        type='email'
        placeholder="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
        <Input 
        type='password'
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signup}>
        Signup
      </Button>
          
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
          <center>
          <img
        width={120}
        className='app__headerImage'
        src='https://th.bing.com/th/id/R5cdb4191426f52fdcc8bbdf57f53cdc2?rik=PoFNyb3OpdWS%2bA&pid=ImgRaw'/>
        </center>
        <Input 
        type='email'
        placeholder="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
        <Input 
        type='password'
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signin}>
        Sign In
      </Button>
          
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
        width={120}
        className='app__headerImage'
        src='https://th.bing.com/th/id/R5cdb4191426f52fdcc8bbdf57f53cdc2?rik=PoFNyb3OpdWS%2bA&pid=ImgRaw'/>
      </div>
      {user?
      <Button onClick={()=>auth.signOut()}>
      Logout
    </Button>
    :
    (
      <div className='app__loginContainer'>
      <Button onClick={()=>setOpenSignIn(true)}>
        Sign In
      </Button>
      <Button onClick={()=>setOpen(true)}>
        Sign Up
      </Button>
      </div>
    )
    
    }
      
      {posts?.map(({id,post})=>{
        return(
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )
      })}
      
</div>
  );
}

export default App;
