const express = require('express');

const router = express.Router();

const configureSession = require('../../session');

configureSession(router);

router.get("/dashboard", function(req, res){
    console.log(req.session)
    console.log("dashboard req")
    res.render("dashboard.ejs")
})

module.exports = router;

