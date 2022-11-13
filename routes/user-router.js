const router = require('express').Router()
const {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
} = require('../controllers/user-ctrl')

router.get('/', getUsers)
router.get('/byId/:id', getUserById)
router.post('/saveData', createUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)

module.exports = router;
