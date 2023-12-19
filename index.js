const express = require('express');
const path = require('path');
const session = require('express-session')

const expressApp = express();
expressApp.set("view engine", "ejs");
expressApp.set('views', __dirname + '/src/views');
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(express.static(__dirname + '/src/uploads'));
expressApp.use(express.static(__dirname + '/src/js'));


var sessionmiddleware = session({
    secret: 'keyboard cat',
    resave: true,
    saveuninitialized: true
});


//Routes
const dashboardRoutes = require('./src/routes/dashboard');
const usersRoutes = require('./src/routes/users').default;
const loginRoutes = require('./src/routes/login').default;
const providersRoutes = require('./src/routes/providers').default;
const categoriesRoutes = require('./src/routes/categories').default;
const productsRoutes = require('./src/routes/products').default;


expressApp.use(sessionmiddleware);
expressApp.use(function (req, res, next) {
    if (req.path == '/login') {
        next();
    } else if (req.session.user_id) {
        next();
    }
    else {
        res.redirect("/login")
    }
});

expressApp.use(new loginRoutes().ruta);
expressApp.use(dashboardRoutes);
expressApp.use(new usersRoutes().ruta);
expressApp.use(new providersRoutes().ruta);
expressApp.use(new categoriesRoutes().ruta);
expressApp.use(new productsRoutes().ruta);



expressApp.listen(3000, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", "http://localhost:3000/login");
})