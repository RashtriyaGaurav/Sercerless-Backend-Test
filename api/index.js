const express = require("express");
const path = require("path");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const userModel = require('./models/user_model');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const { isLoggedin } = require('../middlewares/isLoggedin');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',isLoggedin,function(req,res){
  res.render('index')
})
app.get('/signup',function(req,res){
    console.log("Cookies:", req.cookies);
  res.render('signup')
})

app.post('/signup',async function(req,res){
    try{
        const {name,email,password} = req.body;

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            res.send('User Already Exists!');
        }

        const user = await userModel.create({name,email,password});
        const token = generateToken(user);

        res.cookie("token", token);
        res.redirect('/');


    }
     catch (err) {
        res.status(400).send(err.message);
    }
})

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Express on Vercel!"
    });
});

// Export instead of app.listen()
module.exports = app;