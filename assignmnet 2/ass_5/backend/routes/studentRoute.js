const express = require('express')
const router = express.Router()
const student = require('../models/studentModel')
router.get('/', async (req, res) => {
    try {
        const data = await student.find()
        if (data) {
            return res.send(data)
        } else {
            return res.status(404).send('No Data Found')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await student.findById(id)
        if (data) {
            return res.send(data)
        } else {
            return res.status(404).send('No Data Found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newStudent = new student({ ...data })
        const response = await newStudent.save()
        res.json("Student added successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const response = await student.findByIdAndUpdate(id, data)
        if (response) {
            return res.json("Student updated successfully")
        } else {
            return res.status(404).send('No data found !!')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!!')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await student.findByIdAndDelete(id)
        if (response) {
            res.json('student deleted successfully')
        } else {
            res.status(500).json('Something went wrong')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json('Something went wrong')
    }
})

module.exports = router