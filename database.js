const books =[
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2021-11-28",
        language: "en",
        numPage: 250,
        author: [1,2],
        publications: [1],
        category: ["tech","programming","education"]
    }
];
const author = [
    {
        id: 1,
        name: "neha",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "heena",
        books: ["12345Book"]
    }
];

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book  "]

    }
];

module.exports = {books,author,publication};