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
    const author = new Author({
        name: req.body.name
    })
    author.save((err,newAuthor) => {
        if(err){
            res.render('authors/new', { 
                author: author,
                errorMessage: 'Error creating Author'
            })
        }
        else{
            //res.redirect(`/authors/${newAuthor.id}`)
            res.redirect('authors') 
        }

    })
    //res.send(req.body.name)
})
module.exports=router