const express = require('express');
const router = express.Router();


router.get("/home", (req, res) => {
    res.render("home"); // Render the home.ejs template
});

module.exports = router;


