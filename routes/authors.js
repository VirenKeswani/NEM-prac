const express = require('express')
const { route } = require('express/lib/application')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

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
        res.redirect('authors') 
        //res.redirect(`/authors/${newAuthor.id}`)
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
router.get('/:id', (req,res)=>{
    res.send('Show Author ' + req.params.id)
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

router.put('/:id', (req,res)=>{
    res.send('Update Author ' + req.params.id)
})

router.delete('/:id', (req,res)=>{
    res.send('Delete Author ' + req.params.id)
})
module.exports=router