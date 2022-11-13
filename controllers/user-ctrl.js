const {users}  = require('../models/users-model');

const getUsers = (req, res) => {
    res.send({ massage: "success", users })
}
const createUser = (req, res) => {
    users.push(req.body.user)
    res.send("success")
}
const getUserById = (req, res) => {
    const userItem = users.find(user => user.id == req.params.id)
    userItem ? res.send(userItem) : res.send("not found")
}
const deleteUser = (req, res) => {
    const startIndex = findUserIndex(req)
    const as = users.splice(startIndex, 1)
    as ? res.send(users) : res.send("error")
}
const updateUser = (req, res) => {
    const userIndex = findUserIndex(req)
    if (userIndex > -1) {
        users[userIndex] = req.body.user
        return res.send("success")
    }
    res.send("user not found")
}
function findUserIndex(req) {
    const userItem = users.find(user => user.id == req.params.id);
    const startIndex = users.indexOf(userItem);
    return startIndex;
}
module.exports={
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}