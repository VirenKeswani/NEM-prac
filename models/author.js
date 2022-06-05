const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

// book ref from author here
module.exports = mongoose.model('Author', authorSchema)