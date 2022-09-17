const express = require('express')
const mongoose = require('mongoose')
const router = require('./routers/routers')
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

//app.get('/', (req, res) => res.send('hello world'))

app.use(cors({
    origin: true,
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router)

console.log(`env mongo > `, process.env.URL_MONGODB)
mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB Connected on ${process.env.URL_MONGODB}`))
    .catch(error => console.error(error))


const portApp = process.env.PORT || 3002;
app.listen(portApp, () => console.log(`Server running on port ${portApp}`))