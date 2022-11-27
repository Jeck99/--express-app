const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const netServer = require('http').createServer(handler).listen(6060)
const io = require('socket.io')(netServer);
const fs = require('fs');
require('./DB')
const usersRouter = require('./routes/user-router');
const booksRouter = require('./routes/books-router')
const { usersCollection } = require('./models/users-model')
const app = express();
const msgModel = require('./models/massage-model')
const port = 4040;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const myMiddleware = (req, res, next) => {
    const user = usersCollection.find(userItem => userItem.email == req.body.email)
    !user ? res.send("email not found") :
        req.body.password == user.password ? next():res.send('incorrect password')
}
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.get('/', (req, res) => {
    res.send({ massage: "success" })
})
// netServer.on('request', handler);
function handler (req, res) {
    fs.readFile('./mini-chat-app/index.html',
     (err, data)=> {
      if (err) {
        console.log(err);
        return res.end('Error loading index.html');
      }
      res.end(data);
    });
  }
  
  io.on('connection', (socket) => {
    socket.on('message', msg => {
      msgModel.insertMany(msg)
      io.emit('message', msg);
    });
  });
app.listen(port, () => {
    console.log(process.env.CONNECTION_STRING);
    console.log(`server listen on port: ${port}`);
})