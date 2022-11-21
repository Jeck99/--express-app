const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    numberOfPages: Number,
    author: String,
    year: Number
},
    {
        timestamps: true
    })
module.exports = mongoose.model("book",BookSchema)