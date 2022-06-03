const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//get all authors routes
router.get('/', (req, res) => {
    res.render('authors/index')
})


// new author routes
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})


//create author
router.post('/', (req, res) => {
    res.send('Create')
})
module.exports=router