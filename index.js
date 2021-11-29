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

//UPDATE PUB AND BOOK
/*
Route            /pub/update/book
Description      update the pub and book
Access           Public 
Parameter        isbn
Methods          PUT
*/

booky.put("/pub/update/book/:isbn",(req,res)=>{
    //Update the pub db
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book db
    database.books.forEach((book)=>{
        if(book.ISBN==req.params.isbn){
            book.publications = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated!!"
    })
});

//DELETE A BOOK 
/*
Route            /book/delete
Description      Delete a book
Access           Public 
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn",(req,res)=>{
    const updateBookDatabase  = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updateBookDatabase;
    return res.json({
        books: database.books
    })
})


//DELETE An Author from a book and vice versa
/*
Route            /book/delete/author
Description      Delete an author from a book and vice versa
Access           Public 
Parameter        isbn, author id
Methods          DELETE
*/

booky.delete("/book/delete/auhtor/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList = book.author.filter((eachAuthor)=> eachAuthor !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });
    //update author database
    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id===parseInt(req.params.authorId)){
            const newBookList = eachAuthor.books.filter((book)=>book!==req.params.isbn);
            eachAuthor.books = newBookList;
            return;
        }
    });
    return res.json({
        books: database.books,
        authors: database.author,
        message: "Delete Author and book"
    })
});
booky.listen(3000,()=>console.log("server is up and running"));