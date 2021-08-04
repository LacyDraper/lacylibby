import React, { useState, useEffect } from 'react';
import firebase, {storageRef} from 'firebase';



// need to move state to App and pass it down by props
const Upload = (props) => {

    const [ inventoryImages, setInventoryImages] = useState([]);
    

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    const handleUploadImage = (event) => {
        if (event.target.files){
            const image = event.target.file;
            setInventoryImages({image})
            console.log(inventoryImages,'testing printing inventory image info')

        }
    }


    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <div className='form'>
                    <label> Choose File</label>
                    <input
                        type='file'
                        onChange={handleUploadImage}
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