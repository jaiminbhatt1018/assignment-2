const express = require('express')
const app = express()
const cors = require('cors')
const { sign, verify } = require('./Middleware/authenticate')
require('dotenv').config()
require('./')

const studentRouter = require('./routes/studentRoute')
const student = require('./models/studentModel')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    console.log('default response')
    res.send('DEFAULT RESPONSE FROM SERVER')
})
app.post('/login', async (req, res) => {
    let { username, password } = req.body
    if (username && password) {
        let response = await student.find({ name: username, password: password });
        if (response.length === 1) {
            return res.json(sign({ username }))
        } else {
            return res.status(401).json('Invalid credentials')
        }
    } else {
        return res.status(401).json('Please provide username and password')
    }
})
app.use('/get-token', sign)
app.use('/student', verify, studentRouter)
app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`);
})