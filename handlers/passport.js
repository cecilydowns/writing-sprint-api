const passport = require('passport');
const mongoose = require('mongoose');
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const User = mongoose.model('User')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.SECRET
}

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload)
    User.findById(jwt_payload.id, (err, user) => {
      if(!err){
        return next(null, user)
      } else {
        return next(null, false)
      }
    })
  })
 
passport.serializeUser(function(user, done) {
    console.log(`in serializeuser - ${user.id}`);
    done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
    console.log('in deserializeuser');
    console.log(`id - ${id}`)
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(strategy)
  