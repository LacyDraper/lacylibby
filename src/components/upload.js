import React, { useState, useEffect } from 'react';
import { storage, storageRef , librariesCollection} from '../utils/firebase';
// import Resizer from "react-image-file-resizer";


// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       1000,
//       1000,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       "base64"
//     );
//   });

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
           
            librariesCollection.doc(id).update({
            
                photo_URL : downloadURL,
                dateUploaded : image.lastModifiedDate
            })
            
            
            
            console.log('Uploaded image', image.name)
        })
    
    }
    
    
    return(
        // <>
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
        // </>
)
}
export default Upload;
















