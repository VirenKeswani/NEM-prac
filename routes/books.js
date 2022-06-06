const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/book')
const uploadPath = path.join('Public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const Author = require('../models/author')
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callcallback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//get all books routes
router.get('/', async (req, res) => {
    res.render('books/index')
   //res.send('books')
})


// new book routes
router.get('/new', async(req, res) => {
    renderNewPage(res, new Book())
    //res.send('new book')
})


//create book
router.post('/', upload.single('cover') ,async (req, res) => {
   const filename = req.file != null ? req.file.filename : null
    const book = new Book({
        title:req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate),
        description : req.body.description,
        pageCount: req.body.pageCount,
        coverImageName : filename
        
    })
    try{
        const newBook = await book.save()
       res.redirect('books')
       //res.redirect(`/books/${newBook.id}`)
    }
    catch{
        if(book.coverImageBasePath != null){
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book , true)
    }
})




async function renderNewPage(res , book, hasError = false){
    try{
        const author= await Author.find({})
        const params =  {
            author : author,
            book : book
        }
        if(hasError){
            params.errorMessage = 'Error creating Book'
        }
        res.render('books/new', params)
    }
    catch{
        res.redirect('/books')
    }
}


function removeBookCover(filename){
    fs.unlink(path.join(uploadPath, filename), err => {
        if(err){
            console.error(err)
        }
    })
}

module.exports=router