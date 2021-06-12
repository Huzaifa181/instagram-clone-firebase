import React,{useState} from 'react'
import Button from "@material-ui/core/Button"
import {db,storage} from './firebase'
const ImageUpload = () => {
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
            }
        )
    }
    return (
        <div>
            <input type="text" placeholder="Enter a Caption" value={} onChange={(e)=>setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
