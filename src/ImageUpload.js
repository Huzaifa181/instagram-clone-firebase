import React,{useState} from 'react'
import Button from "@material-ui/core/Button"
import {db,storage} from './firebase'
import firebase from 'firebase'
const ImageUpload = ({username}) => {
    const [caption, setCaption]=useState('')
    const [image, setImage]=useState(null)
    const [progress, setProgress]=useState(0)
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload=(e)=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error)=>{
                alert(error.message)
            },
            ()=>{
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        caption,
                        imageUrl:url,
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        username
                    })
                    setProgress(0)
                    setCaption("")
                    setImage(null)
                })
            }
        )
    }
    return (
        <div className="imageupload">
            <progress value={progress} className="imageupload_progress" max="100"/>
            <input type="text" placeholder="Enter a Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
