const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

//get all books routes
router.get('/', async (req, res) => {
    res.render('books/index')
   //res.send('books')
})


// new book routes
router.get('/new', async(req, res) => {
    try{
        const author= await Author.find({})
        const book = new Book()
        res.render('books/new', {
            author : author,
            book : book
        })
    }
    catch{
        res.redirect('/books')
    }
    //res.send('new book')
})


//create book
router.post('/', async (req, res) => {
    //res.send("Create Book")
})
module.exports=router