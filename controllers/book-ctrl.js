const {books}  = require('../models/books-model');

const getBooks = (req, res) => {
    res.send({ massage: "success", books })
}
const createBook = (req, res) => {
    books.push(req.body.book)
    res.send("success")
}
const getBookById = (req, res) => {
    const bookItem = books.find(book => book.id == req.params.id)
    bookItem ? res.send(bookItem) : res.send("not found")
}
const deleteBook = (req, res) => {
    const startIndex = findBookIndex(req)
    const as = books.splice(startIndex, 1)
    as ? res.send(books) : res.send("error")
}
const updateBook = (req, res) => {
    const bookIndex = findBookIndex(req)
    if (bookIndex > -1) {
        books[bookIndex] = req.body.book
        return res.send("success")
    }
    res.send("book not found")
}
function findBookIndex(req) {
    const bookItem = books.find(book => book.id == req.params.id);
    const startIndex = books.indexOf(bookItem);
    return startIndex;
}
module.exports={
    getBooks,
    createBook,
    getBookById,
    deleteBook,
    updateBook
}