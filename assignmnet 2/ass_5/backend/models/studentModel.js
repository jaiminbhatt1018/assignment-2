const mongoose = require('../config/db')
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    city: String
})

module.exports = mongoose.model('Student', studentSchema, 'students')