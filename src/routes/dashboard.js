const express = require('express');

const router = express.Router();

const configureSession = require('../../session');

configureSession(router);

router.get("/dashboard", function(req, res){
    res.render("dashboard.ejs")
})

module.exports = router;

