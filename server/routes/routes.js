// import other routes
const countriesRoutes = require('./countries');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    countriesRoutes(app, fs);

};

module.exports = appRouter;