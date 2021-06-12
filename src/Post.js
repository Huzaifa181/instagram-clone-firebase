import React,{useState, useEffect} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import {db} from './firebase'
import firebase from 'firebase'

const Post = ({username, user,caption, imageUrl, postId}) => {
    const [comments, setComments]=useState([])
    const [comment, setComment]=useState('')
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe=db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>{
                setComments(snapshot.docs.map(doc=>{
                    return(doc.data())
                }))
            })
        }
        return ()=>{
            unsubscribe()
        }
    }, [postId]);
    const postComment=(e)=>{
        e.preventDefault()
        db.collection("posts").doc(postId).collection('comments')
        
        .add({
            text:comment,
            user:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    return (
        <div className="post">
            <div className="post__header">
            <Avatar
            className='post__avatar'
            alt="Huzaifa"
            />
            <h3>
                {username}
            </h3>
            </div>
            <img
                width={120}
                className='post__image'
                src={imageUrl}/>
            <h4 className='post__text'>
                <strong>{username}: </strong> {caption}
            </h4>
            <div className="post__comments">
                {comments?.map(comment=>{
                    return(
                        <p>
                            <b>{user.displayName}</b> {comment.text}
                        </p>
                    )
                })}
            </div>

            {user && 
            <form className="post__commentbox">
            <input
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            type="text" />
            <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            >
                Post
            </button>
        </form>
            }
            
        </div>
    )
}

export default Post
