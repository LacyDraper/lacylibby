import React, { useState, useEffect } from 'react';
import { storage, storageRef } from '../utils/firebase';



// need to move state to App and pass it down by props
const Upload = ( { name, id, photo, onUpdateLibrary } ) => {

    
    const onFileChange =  (event) => {
        const image = event.target.files[0]
        const imageRef = storageRef.child(image.name)
        imageRef.put(image).then(() => {
            console.log('Uploaded image', image.name)
        })
      
    }

       
    const handleUploadImage = (event) => {
        event.preventDefault()
        //if file inside the event, then move forward with upload (10:20 on video)
        if (event.target.files){
            const image = event.target.files;
            //this updates state(below)
            onUpdateLibrary({
                photo: image
                //date: date should be added once it's in Firebase & passed down as prop
            });
            console.log( {image}, "event from image" );

        }
    }
        

    return(
        <>
            <form onSubmit={handleUploadImage}>
                <div className='form'>
                    <label> Choose File</label>
                    <input
                        type='file'
                        onChange={onFileChange}
                    />
                </div>
                <button
                type='submit'
                className='btn btn-primary'
                >
                    Upload File
                </button>
            </form>
        </>

)


}
export default Upload;