const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const connectDB = require("../config/db");
connectDB();

const adminRoutes = require("../routes/admin.routes");
app.use("/admin", adminRoutes);

const categoryRoutes = require("../routes/category.routes");
app.use("/admin/categories", categoryRoutes);

const imageRoutes = require("../routes/image.routes");
app.use("/image", imageRoutes);

const homeRoutes = require("../routes/home.routes");
app.use("/", homeRoutes);

app.get('/',function(req,res){
    res.render('home/index');
})

module.exports = app;
