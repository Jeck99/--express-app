const { usersCollection } = require('../models/users-model');
const { validateEmail } = require('../validation/valid')
const getUsers = (req, res) => {
    res.send({ massage: "success", users: usersCollection })
}
const createUser = (req, res) => {
    if (validateEmail(req.body.user.email)) {
        usersCollection.push(req.body.user)
        res.send("success")
    }
    res.send("email not valid")
}
const getUserById = (req, res) => {
    const userItem = usersCollection.find(user => user.id == req.params.id)
    userItem ? res.send(userItem) : res.send("not found")
}
const deleteUser = (req, res) => {
    const startIndex = findUserIndex(req)
    const as = usersCollection.splice(startIndex, 1)
    as ? res.send(usersCollection) : res.send("error")
}
const updateUser = (req, res) => {
    const userIndex = findUserIndex(req)
    if (userIndex > -1) {
        usersCollection[userIndex] = req.body.user
        return res.send("success")
    }
    res.send("user not found")
}
function findUserIndex(req) {
    const userItem = usersCollection.find(user => user.id == req.params.id);
    const startIndex = usersCollection.indexOf(userItem);
    return startIndex;
}
module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}