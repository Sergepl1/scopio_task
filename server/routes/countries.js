
const userRoutes = (app, fs) => {

    // variables
    const dataPath = 'server/data/countries.json';

    // READ
    app.get('/countries', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = userRoutes;