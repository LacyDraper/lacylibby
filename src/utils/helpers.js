// helper function that returns the data as a list of abojects with the id
export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            id : doc.id
        })
    })

    return data;
}