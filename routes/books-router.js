const router = require('express').Router()
const {
    getBooks,
    createBook,
    getBookById,
    deleteBook,
    updateBook
} = require('../controllers/book-ctrl')

router.get('/', getBooks)
router.get('/byId/:id', getBookById)
router.post('/saveData', createBook)
router.delete('/delete/:id', deleteBook)
router.put('/update/:id', updateBook)

module.exports = router;
