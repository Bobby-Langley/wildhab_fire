
const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-e63c217782.json");

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
  })
} 
const firestore = admin.firestore()
const eventRef = firestore.collection('events')

exports.postEvent = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }
    let newEvent = req.body
    let now = admin.firestore.FieldValue.serverTimestamp()
    newEvent.updated = now 
    newEvent.created = now

    eventRef.add(newEvent)
        .then(docRef => {
            eventRef.doc(docRef.id).get()
                .then(snapshot => {
                    let event = snapshot.data()
                    event.id = snapshot.id
                    res.status(200).json({
                        status: 'successfully successful success',
                        data: event,
                        message: 'Events loaded',
                        statusCode: '200'
                    })
                    return 
                })
        })
        .catch(err => {
            console.log(err)
            res.status().send({
              status: 'errrrrr',
              data: err,
              message: 'shits broke',
              statusCode: '500'
          
              }) 
        })
}

exports.getEvents = (req, res) => {
    if(!firestore) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }
     eventRef.get()
          .then(collection => {
              const eventResults = collection.docs.map(doc => {
                  let event = doc.data()
                  event.id = doc.id
                  return event
              })
              res.status(200).json({
                  status: 'successfully successful success',
                  data: eventResults,
                  message: 'Events loaded',
                  statusCode: '200'
                })
          })
          .catch(err => {
              console.log(err)
              res.status(500).send({
                status: 'errrrrr',
                data: err,
                message: 'shits broke',
                statusCode: '500'
           }) 
          })
     }

     exports.updateAllEvents = (req, res) => {
        if(!firestore) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })
            firestore = admin.firestore()
        }
        eventRef.update({
           "updated all by": "bobby"
        })
            .then(() => {
                res.status(200).json({
                status: 'Updated All Successfully',
                message: 'Event updated',
                statusCode: '200'
                })
            })
            .catch(err => {
                res.status(500).json ({
                    status: 'errrrrr',
                    data: err,
                    message: 'shits broke -- update err',
                    statusCode: '500'
                })
            })
    }