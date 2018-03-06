const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcrypt')

exports.login = async (req, res, next) => {
    const user = await User.findOne({ 'email': req.body.email })

    // passport.authenticate

    if(!user) {
        res.status(401).json({message:"no such user found"});
    }

    bcrypt.compare(req.body.password, user.password, (err, bcres) => {
        if(bcres === true){
            req.logIn(user, (err) => {
                if(err) { 
                    return next(err)
                } else {
                    const payload = {id: user.id};
                    const token = jwt.sign(payload, process.env.SECRET);
                    res.json({message: "ok", token: token});
                }
            })
        } else {
            res.status(401).json({message:"Wrong password."});
        }
    })

};