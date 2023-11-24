function UserRoutes(app) {
    app.get('/usuarios', (req, res) => {
        app.render('users.ejs')
    })
}