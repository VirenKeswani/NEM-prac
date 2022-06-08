const express = require('express')
const { route } = require('express/lib/application')
const { render } = require('express/lib/response')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

//get all authors routes
router.get('/', async (req, res) => {
    let searchOptions={}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions : req.query
        })
    }
    catch (err) {
        res.redirect('/')
    }

   // res.render('authors/index')
})


// new author routes
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})


//create author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect('authors') 
        res.redirect(`/authors/${newAuthor.id}`)
    }
    catch{
        res.render('authors/new', { 
        author: author,
        errorMessage: 'Error creating Author'
    })
}

    //res.send(req.body.name)
}
)




//edit secton 
router.get('/:id', async(req,res)=>{
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author: author.id}).limit(6).exec()
        res.render('authors/show', {
            author : author,
            booksByAuthor : books
        })
    }
    catch{

        res.redirect('/')
    }

    //res.send('Show Author ' + req.params.id)
})

router.get('/:id/edit', async(req,res)=>{
    const author = await Author.findById(req.params.id)
    try{
        res.render('authors/edit', { author:  author })
    }
    catch{
        res.render('/authors')
    }
   
})

router.put('/:id', async(req,res)=>{
    let author
    try{
        author = await Author.findByIdAndUpdate(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`) 
        //res.redirect(`/authors/${newAuthor.id}`)
    }
    catch{
        if( author == null){
            res.redirect('/')
        }
        else{
            res.render('authors/edit', { 
                author: author,
                errorMessage: 'Error updating Author'
            })
        }
        
}


    //res.send('Update Author ' + req.params.id)
})

router.delete('/:id', async(req,res)=>{
    let author
    try{
        author = await Author.findByIdAndUpdate(req.params.id)
        
        await author.remove()
        res.redirect(`/authors`) 
        //res.redirect(`/authors/${newAuthor.id}`)
    }
    catch{
        if( author == null){
            res.redirect('/')
        }
        else{
            res.redirect(`/authors/${author.id}`)
        }
        
}
   // res.send('Delete Author ' + req.params.id)
})
module.exports=router