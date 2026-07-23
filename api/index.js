const express = require("express");
const path = require("path");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const userModel = require("./models/user_model");
const { generateToken } = require("../utils/generateToken");
const { isLoggedin } = require("../middlewares/isLoggedin");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));


// =================== Routes ===================

// Home
app.get("/", isLoggedin, (req, res) => {
    res.render("index", { user: req.user });
});

// Signup Page
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.send("User Already Exists!");
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
});

// Logout
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/signup");
});

// Test API
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Express on Vercel!",
    });
});

module.exports = app;