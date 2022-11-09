const express = require('express');
const app = express();
const port = 8080;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.post('/',(req,res)=>{
    const data = req.body;
    res.send(data)
})
app.get('/', (req, res) => {
    res.send("hello world")
})
app.get('/jacob', (req, res) => {
    res.send("hello jacob")
})
app.get('/:id', (req, res) => {
    res.send(`the id is: ${req.params.id}`)
})

app.listen(port, () => {
    console.log(`server listen on port: ${port}`);
})