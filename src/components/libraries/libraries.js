// import React, { Component } from 'react';
// import { db } from '../../utils/firebase';
// import { firebaseLooper } from '../../utils/helpers';
// import { librariesCollection } from '../../utils/firebase';


// class Libraries extends Component {
    
//     //need to create state for Libraries so we can map over the state and get each object pinned on the map
// //     state = {
// //         libraries: null
// //     }

    
// //     componentDidMount(){
        
// //         db.collection('libraries').get().then( snapshot => {
// //             const libraries = firebaseLooper(snapshot);
// //             this.setState({
// //                 libraries
// //             });
// //             console.log(libraries)
// //             console.log(this.state,'<---libraries state')
// //         }).catch(error=> {
// //             console.log(error)
// //         });
     
// // }
 
// //    //this maps over libraries collection. we want to be able to access a libraries id so we can assign image to that library
// //     accessLibraryData = (libraries) => (
// //         libraries ?

// //             libraries.map((data,i) => (            
                
                
// //                 <tr key={i} >
// //                     <th>{data.name}</th>
// //                     <th>{data.location[0]}</th>
// //                     <th>{data.location[1]}</th>
// //                 </tr>
// //     ))
// //         : null
// //     )

   
//     render(){
//         const libraries  = this.state.libraries   
//         console.log(data.name)
//         return(
//         <div>
        
//             <table className="table table-dark">
//                 <thead>
//                     <tr>
//                         <th> Name </th>
//                         <th> Lat </th>
//                         <th> Long </th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     { this.handleLibraryData(libraries)}
//                 </tbody>
//             </table>
//         </div>
       
//     )
// }
// }

// export default Libraries;