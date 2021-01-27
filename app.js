const express = require('express')
const bodyParser = require('body-parser')
const {getEvents, postEvent} = require('./src/events')
const {getPeople, postPerson} = require('./src/users')
const {getSingleEvent, deleteEvent, updateEvent} = require('./src/events/eventId')
const {getSingleUser, deleteSinglePerson, updateSinglePerson} = require('./src/users/userId')


const app = express()
app.use(bodyParser.json())
const port = 3000


app.get('/events', getEvents)
app.get('/events/:eventId', getSingleEvent)
app.get('/users/:userId', getSingleUser)

// app.delete('/events/:eventId', deleteSingleEvent)
app.post('/events', postEvent)
app.delete('/events/:eventId', deleteEvent)
app.patch('/events/:eventId', updateEvent)
app.patch('/users/:userId', updateSinglePerson)

app.get('/users', getPeople)
app.post('/users', postPerson)
app.delete('/users/:userId', deleteSinglePerson)






app.get('/', (req,res) => {
    res.status(200).send("hey hey hey")
})

app.listen(port, () => {
    console.log('listening on http://localhost:' + port)
})
