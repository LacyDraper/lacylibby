// helper function that returns the data as a list of objects with the location

export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            location : doc.location
        })
    })

    return data;
}