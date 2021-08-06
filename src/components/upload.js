import React, { useState, useEffect } from 'react';
import { storage, storageRef , librariesCollection} from '../utils/firebase';




// give photo as a parameter inside of array of useEffect hook   when photo prop value changes update the datebase 


const Upload = ( { name, id, photo_URL , onUpdateLibrary ,lat, lng } ) => {

    
    const onFileChange =  (event) => {
        event.preventDefault()
        
        const image = event.target.files[0]
        console.log(image)
        const imageRef = storageRef.child(`/images/library/${image.name}`)
        .put(image)
        .then(() => {
            onUpdateLibrary({
                name : name,
                id : id,
                lat : lat,
                lng : lng,
                photo_URL : imageRef.fullPath,
            })
            // create a reference to the collections document field  to be updated
            //
            // need to now send a post or patch request to our firestore to have changes saved 
            
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