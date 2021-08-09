import React, { useState, useEffect } from 'react';
import { storage, storageRef , librariesCollection} from '../utils/firebase';

<<<<<<< HEAD




=======
>>>>>>> 571a94c9ea29c1c0e981df54fe8a25ef7a54eec6
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
            //const date = uploadSnapshot.FullMetadata.timeCreated()
<<<<<<< HEAD
           
           
=======
            // const date = await uploadSnapshot.ref.lastModifiedDate
        
>>>>>>> 571a94c9ea29c1c0e981df54fe8a25ef7a54eec6
            // .set is updating the Firestore DB with new photo_URL field 
            librariesCollection.doc(id).update({
            
                photo_URL : downloadURL,
                dateUploaded : image.lastModifiedDate
            })
            
            
<<<<<<< HEAD
           
=======
>>>>>>> 571a94c9ea29c1c0e981df54fe8a25ef7a54eec6
            
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
















