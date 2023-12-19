const session = require('express-session');

const sessionConfig = {
    secret: 'sena-trabajo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
};

const configureSession = (app) => {
    app.use(session(sessionConfig));
};

module.exports = configureSession;