


firestore.collection('people').get()
    .then(collection => {
        collection.forEach(doc => {
            console.log(doc.id,  '->' , doc.data())
        })
    })

    .catch(err => console.log({err})) 

    const firestore = admin.firestore()