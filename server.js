const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send({ massage: "success"})
})
app.listen(port, () => {
    console.log(`server listen on port: ${port}`);
})

app.post('/', (req, res) => {
    users.push(req.body.user)
    res.send("success")
})
app.get('/getData', (req, res) => {
    fs.readFile('./test-file.txt', { encoding: 'utf8' }, (error, content) => {
        if (error) return res.send({ massage: error });
        res.send({ massage: "success", content })
    })
})
app.post('/saveData', (req, res) => {
    fs.appendFile('./test-file.txt', toString(req.body.data), (error) => {
        if (error) return res.send("save data failed");
        res.send("success")
    })
})
app.get('/byId/:id', (req, res) => {
    const userItem = users.find(user => user.id == req.params.id)
    userItem ? res.send(userItem) : res.send("not found")
})
app.delete('/student/delete/:id', (req, res) => {
    const startIndex = findUserIndex(req);
    const as = users.splice(startIndex, 1)
    as ? res.send(users) : res.send("error")
})
app.put('/student/update/:id', (req, res) => {
    const userIndex = findUserIndex(req);
    if (userIndex > -1) {
        users[userIndex] = req.body.user;
        return res.send("success")
    }
    res.send("user not found");
})


function findUserIndex(req) {
    const userItem = users.find(user => user.id == req.params.id);
    const startIndex = users.indexOf(userItem);
    return startIndex;
}
