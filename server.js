const express = require('express');
const bodyParser = require('body-parser');
require('./app/routes/crud.routes.js')(app);

const app = express();

app.use(bodyParser.urlencoded({ extended : true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
    res.json({"message": "Welcome!"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});

