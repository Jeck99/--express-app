const userModel = require('../models/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY;
const register = (req, res) => {
    bcrypt.genSalt()
        .then((salt) => {
            bcrypt.hash(req.body.user.password, salt)
                .then(async (hashPassword) => {
                    req.body.user.password = hashPassword;
                    await userModel.insertMany(req.body.user)
                        .then(() => res.send("success"))
                        .catch(err => res.send(err))
                })
                .catch(err => { console.log(err); })
        })
        .catch(error => { console.log(error); })
}
const login = async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    await userModel.findOne({ email }) 
       .then((user) => {
        if (!user) {
            return res.status(404).json({ emailNotFound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                jwt.sign(payload, key, { expiresIn: 31556926 }, (err, token) => {
                    res.json({ success: true, token: "Bearer " + token,user:{name:user.name,email:user.email} });
                });
            }
            else {
                return res.status(400).json({ passwordIncorrect: "Password incorrect" });
            }
        });
    });
}
module.exports = {
    register,
    login
}