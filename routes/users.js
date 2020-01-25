const express = require('express');
const app =express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/Users');
app.use((req,res,next)=>{
  res.locals.currentuser=req.user;
  next();
})
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', async (req, res) =>{
    const { username, email, password, password2 } = req.body;
    let errors = [];
    if(false){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
               const newUser = new User({
                   username:req.body.username,
                   email:req.body.email,
                   password:req.body.password
               });
                    await newUser.save();
                    res.redirect('/users/login');     
    }
});

//login handle
router.post('/login', async (req, res,next) =>{
   await passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/users/login'
   })(req, res, next);
});

module.exports = router;
