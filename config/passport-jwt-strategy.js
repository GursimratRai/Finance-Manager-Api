//Acquiring Passport
const passport = require('passport');
//use passport-jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//user modal
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}

//Using jwt strategy
passport.use(new JWTStrategy(opts,function(payload,done){

    User.findById(payload._id,function(err,user){
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));

module.exports = passport;