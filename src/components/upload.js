import React, { useState, useEffect } from 'react';
import { storage, storageRef , librariesCollection} from '../utils/firebase';




// give photo as a parameter inside of array of useEffect hook   when photo prop value changes update the datebase 


const Upload = ( { name, id, onUpdateLibrary ,lat, lng } ) => {

    
    const onFileChange =  (event) => {
        event.preventDefault()
        
        const image = event.target.files[0]
        console.log(image)
        storageRef.child(`/images/library/${image.name}`)
        
        .put(image)
        .then(async(uploadSnapshot) => {
            // uploadSnapshot.ref.getDownloadURL expression gets resolved into a promise. we have to use await to unwrap the promise 
            const downloadURL = await uploadSnapshot.ref.getDownloadURL()
            
            
            console.log(uploadSnapshot, 'timestamp')
            console.log(downloadURL,'<--url')
            // .set is updating the Firestore DB with new photo_URL field 
            librariesCollection.doc(id).update({
              
                photo_URL : downloadURL,
                dateUploaded : image.lastModifiedDate

            })
            onUpdateLibrary({
                name : name,
                id : id,
                lat : lat,
                lng : lng,
                photo_URL : downloadURL,
            })
           
            
            console.log('Uploaded image', image.name)
        })
    
    }

    
    

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