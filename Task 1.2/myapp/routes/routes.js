const express = require('express');

const router = express.Router()
const Model = require('../models/model');
module.exports = router;

//Post Method
router.post('/saveUser', async(req, res) => {

    const data = new Model({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        birthdate: req.body.birthdate
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get 1 method
router.get('/getOne/:username', async(req, res) => {
    try {
        const data = await Model.find({ 'username': { '$regex': '.*' + req.params.username + '.*' } });
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async(req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by username Method
router.patch('/updateOne/:username', async(req, res) => {
    try {
        const username = { 'username': { '$regex': '.*' + req.params.username + '.*' } };
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findOneAndUpdate(
            username, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// router.patch('/updateAll/:username', async(req, res) => {
//     try {
//         const username = { 'username': { '$regex': '.*' + req.params.username + '.*' } };
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.updateMany(
//             username, updatedData, options
//         )
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})