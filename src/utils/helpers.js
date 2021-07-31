// helper function that returns the library data as a list of objects

export const firebaseLooper = (snapshot) => {
    let libraries_data = [];
    snapshot.forEach(doc => {
        libraries_data.push({
            ...doc.data(),
            id : doc.id
        })
    })

    return libraries_data;
}