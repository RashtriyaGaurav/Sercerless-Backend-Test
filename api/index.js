const express = require("express");
const app = express();

// Define your server endpoints
app.get("/", (req, res) => {
  res.send("Express website is running successfully on Vercel!");
});

app.get("/about", (req, res) => {
  res.json({ message: "This is the backend data from Express." });
});

// Required for local machine testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

// CRITICAL: Export the app instance for Vercel's serverless environment
module.exports = app;