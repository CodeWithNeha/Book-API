const express = require("express");
var bodyParser = require("body-parser");

//Database
const database = require("./database");

//Initialize express
const booky = express()
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
//ApI to get all the books 

/*
Route            /
Description     Get all books
Access          Public 
Parameter       NONE
Methods         GEt
*/
booky.get("/",(req,res)=>{
    return res.json({books: database.books});
})

//Get Specific book

/*
Route            /is
Description     Get Specific books
Access          Public 
Parameter       ISBN
Methods         GEt
*/

booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for ISBN of ${req.params.isbn}`
        });
    }

    return res.json({book: getSpecificBook});
})

//Get Books on a Specific category
/*
Route            /c
Description     Get Specific books
Access          Public 
Parameter       category
Methods         GET
*/

booky.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category) 
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for Category of ${req.params.category}`
        });
    }

    return res.json({book: getSpecificBook});

})


//Get Books Based on Language
/*
Route            /l
Description     Get Specific books
Access          Public 
Parameter       language
Methods         GET
*/

booky.get("/l/:language",(req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language 
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found for Language of ${req.params.language}`
        });
    }

    return res.json({book: getSpecificBook});

})


//Get all the author
/*
Route            /author
Description     Get all the author
Access          Public 
Parameter       NONE
Methods         GET
*/

booky.get("/author",(req,res)=>{
    return res.json({authors: database.author})
})

//Get all the author based on book
/*
Route            /author/book
Description     Get all the author based on book
Access          Public 
Parameter       ISBN
Methods         GET
*/

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    )
    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for isbn of ${req.params.isbn}`
        });
    }

    return res.json({authors: getSpecificAuthor});

})



//Get all the publications
/*
Route            /pub
Description     Get all the publications
Access          Public 
Parameter       NONE
Methods         GET
*/

booky.get("/pub",(req,res)=>{
    return res.json({Publications: database.publication})
})


//Get specific publications based on books
/*
Route            /pub/book
Description     Get all the author based on book
Access          Public 
Parameter       ISBN
Methods         GET
*/

booky.get("/pub/book/:isbn",(req,res)=>{
    const getSpecificPublication = database.publication.filter(
        (pub) => pub.books.includes(req.params.isbn)
    )
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No author found for isbn of ${req.params.isbn}`
        });
    }

    return res.json({Publications: getSpecificPublication});

})

//ADD New Books
/*
Route            /book/new
Description     add new book
Access          Public 
Parameter       NONE
Methods         POST
*/

booky.post("/book/new",(req,res)=>{
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});


//ADD New Author
/*
Route            /author/new
Description     add new author
Access          Public 
Parameter       NONE
Methods         POST
*/

booky.post("/author/new",(req,res)=>{
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthors: database.author});
});

//ADD New Publication
/*
Route            /pub/new
Description     add new publication
Access          Public 
Parameter       NONE
Methods         POST
*/

booky.post("/pub/new",(req,res)=>{
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublications: database.publication});
});

booky.listen(3000,()=>console.log("server is up and running"));