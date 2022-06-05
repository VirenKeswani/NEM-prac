const express = require('express')
const router = express.Router()
const Book = require('../models/book')

//get all books routes
router.get('/', async (req, res) => {
    res.render('books/index')
})


// new book routes
router.get('/new', (req, res) => {
    res.render('books/new')
})


//create book
router.post('/', async (req, res) => {
    
})
module.exports=router