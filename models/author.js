const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})


authorSchema.pre('remove', function(next) {
    Book.find({author :this.id}, (err,books)=>{
        if(err){
            next(err)
        }
        else if(books.length > 0){
            next(new Error('Author has books'))
        }
        else{
            next()
        }
    })
})

// book ref from author here
module.exports = mongoose.model('Author', authorSchema)