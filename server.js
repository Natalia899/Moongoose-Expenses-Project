const express = require('express')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensesDB', { useNewUrlParser: true })
const bodyParser = require('body-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', api)




const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})