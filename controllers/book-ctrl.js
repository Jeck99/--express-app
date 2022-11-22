const bookModel = require('../models/books-model');

const getBooks = async (req, res) => {
    await bookModel.find({})
        .then((books, error) => {
            if (error) {
                return res.status(400).json({ success: false, error })
            }
            if (books.length == 0) {
                return res.json({ success: false, massage: "no books" })
            }
            res.status(200).json({ success: true, books })
        })
}
const getBookById = async (req, res) => {
    await bookModel.findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.json({ success: false, massage: "book is not available" })
            }
            return res.status(200).json({ success: true, book })
        })
        .catch(error => res.status(400).json({ success: false, error }))
}
const createBook = async (req, res) => {
    //TODO validation
    await bookModel.insertMany(req.body.book)
        .then(() => res.status(300).json({ success: true, massage: "book added succesfuly" }))
        .catch((error) => res.status(400).json({ success: false, error }))
}
const updateBook = async (req, res) => {
    await bookModel.findByIdAndUpdate(req.params.id, req.body.book)
        .then(result => res.status(200).json({ success: true, result }))
        .catch(error => res.status(400).json({ success: false, error }))
}
const deleteBook = async (req, res) => {
    await bookModel.findByIdAndDelete(req.params.id)
        .then(() => res.status(300).json({ success: true }))
        .catch(error => res.status(400).json({ success: false ,error}))
}


module.exports = {
    getBooks,
    createBook,
    getBookById,
    deleteBook,
    updateBook
}