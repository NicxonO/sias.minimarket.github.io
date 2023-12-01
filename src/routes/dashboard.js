const express = require('express');

const router = express.Router();

const configureSession = require('../../session');

configureSession(router);

router.get("/dashboard", function(req, res){
    console.log(req.session)
    res.render("dashboard.ejs",{user:req.session})
})

module.exports = router;

