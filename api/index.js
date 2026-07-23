const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get('/',function(req,res){
  res.send('Hello World')
})

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Express on Vercel!"
    });
});

// Export instead of app.listen()
module.exports = app;