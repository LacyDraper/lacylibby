import React, { useState, useEffect } from 'react';
import { storage, storageRef } from '../utils/firebase';






const Upload = ( { name, id, photo, onUpdateLibrary ,lat, lng } ) => {

    
    const onFileChange =  (event) => {
        event.preventDefault()
        const image = event.target.files[0]
        console.log(image)
        const imageRef = storageRef.child(`/images/library/${image.name}`)
        console.log(imageRef)
        console.log(imageRef.fullPath)
        imageRef.put(image).then((uploadData) => {
            onUpdateLibrary({
                name : name,
                id : id,
                photo: imageRef.fullPath, //<----- need to figure out how to assisgn URL here
                lat : lat,
                lng : lng
            })
            // we need to now send a post or patch request to our firestore to have changes saved 
            console.log(uploadData) //to see whats in object 
            console.log('Uploaded image', image.name)
        })
      
    }

    
    
   
    // const handleUploadImage = (event) => {
    //     event.preventDefault()
  
    //     if (event.target.files){
    //         const image = event.target.files;
    //         //this updates state(below)
    //         onUpdateLibrary({
    //             photo: image
    //             //date: date should be added once it's in Firebase & passed down as prop
    //         });
    //         console.log( {image}, "event from image" );

    //     }
    // }
        

    return(
        <>
            <form>
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