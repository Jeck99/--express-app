const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/user-router');
const booksRouter = require('./routes/books-router')
const { usersCollection } = require('./models/users-model')
const app = express();
const port = 8080;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const myMiddleware = (req, res, next) => {
    const user = usersCollection.find(userItem => userItem.email == req.body.email)
    !user ? res.send("email not found") :
        req.body.password == user.password ? next():res.send('incorrect password')
}
app.use('/users', usersRouter)
app.use('/books', myMiddleware, booksRouter)
app.get('/', (req, res) => {
    res.send({ massage: "success" })
})
app.listen(port, () => {
    console.log(`server listen on port: ${port}`);
})