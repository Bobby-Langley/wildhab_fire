const express = require('express')
const app = express()
const port = 3000

app.get('/events', (req, res) => {
    res.send('List of Events').status(200)
})

app.get('/', (req,res) => {
    res.status(200).send("hey hey hey")
})





app.listen(port, () => {
    console.log('listening on http://localhost:' + port)
})
