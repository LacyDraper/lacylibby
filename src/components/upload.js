import React, { useState, useEffect } from 'react';
import { storageRef , librariesCollection} from '../utils/firebase';
import {Button} from 'react-bootstrap'




const Upload = ( { name, id, onUpdateLibrary ,lat, lng } ) => {
    
    const onFileChange =  (event) => {
        event.preventDefault()
        
        const image = event.target.files[0]
        // const image = await resizeFile(originalImage)
        
        storageRef.child(`/images/library/${image.name}`)
        
        .put(image)
        .then(async(uploadSnapshot) => {
            // uploadSnapshot.ref.getDownloadURL expression gets resolved into a promise. we have to use await to unwrap the promise 
            const downloadURL = await uploadSnapshot.ref.getDownloadURL()
            //const date = uploadSnapshot.FullMetadata.timeCreated()
           
           
            // .set is updating the Firestore DB with new photo_URL field 
            librariesCollection.doc(id).update({
            
                photo_URL : downloadURL,
                dateUploaded : image.lastModifiedDate
            })
            
            
           
            
            console.log('Uploaded image', image.name)
        })
    
    }
    
    
    return(
            <div>
            <form>
                <input
                    
                    type='file'
                    onChange={onFileChange}
                />
            <br></br>
            </form>
            <br></br>
            <Button className="btn btn-warning btn-sm" 
                type='submit'>
                    Upload File
                </Button>
            </div>    
            
)
}
export default Upload;
















