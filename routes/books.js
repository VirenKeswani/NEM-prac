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

    const book = new Book({
        title:req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate),
        description : req.body.description,
        pageCount: req.body.pageCount,
        
    })
    try{

    }
    catch{

    }
})
module.exports=router