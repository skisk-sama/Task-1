const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    birthdate: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('Data', dataSchema)