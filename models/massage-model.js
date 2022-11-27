const mongoose = require('mongoose');

const MassageSchema = new mongoose.Schema({
    text: { type: String},
    author: { type: String }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("massage", MassageSchema)