const express = require("express");

//Database
const database = require("./database");

//Initialize express
const booky = express()

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
Route            /
Description     Get Specific books
Access          Public 
Parameter       ISBN
Methods         GEt
*/

booky.get("/:isbn",(req,res)=>{
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

booky.listen(3000,()=>console.log("server is up and running"));