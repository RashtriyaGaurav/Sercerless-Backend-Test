const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URI}/ServerTest`)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Connection Error:");
        console.error(err);
    });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    default: 3,
  },
});

// Prevent OverwriteModelError
module.exports = mongoose.models.user || mongoose.model("user", userSchema);