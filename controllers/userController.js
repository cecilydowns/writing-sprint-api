const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')

exports.register = async (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).save()
    })

    res.json({message: "ok"})

};