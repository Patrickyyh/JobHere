import { register,login,updateUser , findPassword} from "../controllers/authController.js";
import express, { application } from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";


import dotenv from 'dotenv';
dotenv.config();
// Google auth

import passport from 'passport';
import Google from 'passport-google-oauth20';
const GoogleStrategy = Google.Strategy;




// rate limitor
import rateLimit from 'express-rate-limit';

const authlimter = rateLimit({
    windowMs: 15 * 60 *1000 ,//15 mints
    max: 10, // limit each Ip to 100 requests er 'window',
    message: 'Too many request from this ip, please try again after 15 mins',
    standardHeaders: true,
    legacyHeaders: false,
})

let isRegister = false;

passport.serializeUser(function(user, done) {
    console.log("here1");
    done(null,user._id);
})

passport.deserializeUser(function(id, done) {
    console.log("here");
    User.findById(id).then(user => {
        done(null,user)
    })
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback'
} ,async (accessToken,refreshToken, profile, done)=> {

    // const {email,}
    const {id,emails,displayName} = profile;
    const {value} = emails[0]


    const userExists = await User.findOne({googleId: id})
    const userEmailExists = await User.findOne({email: value});


    if( !userExists && !userEmailExists  ){

        // sign up the user
        // let name = displayName;
        // let email = value;
        // let password = 123456;
        // const newUser = await User.create({email,password, name});

        // redirect to the resiger page
        isRegister = false;
        done(null,isRegister);

    }else{
        // skip the user creation
        isRegister = true;
        // console.log(userEmailExists);
        // console.log("exist user");
        // // done(null , userEmailExists);
        // done(null, isRegister);
        done(null ,isRegister);

    }
})

);

// Then inject the rate-limit api into the post requests
router.route('/register').post(authlimter,register)
router.route('/login').post(authlimter,login)
router.route('/findpassword').post(findPassword);
// router.route('/google').get(google);
router.get('/google' , passport.authenticate('google',{
    scope: ['profile', 'email']
}))


router.get('/google/callback' , passport.authenticate('google'),function(req,res){

    // const {user} = req;
    // console.log(user);
    // const token = user.createJWT();

    console.log(register);

    // user.password = undefined;
    // res.status(StatusCodes.OK).json({user, token, location: user.location});

    res.redirect('http://localhost:3000/');


})


router.route('/updateUser').patch(authenticateUser, updateUser)

export default router
