const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codehub_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongo"));

db.once('open', function () {
    console.log('connected to database');
})

module.exports = db;