const express = require('express')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
});
var route= require('./routes/Courses');
app.use('/v1/courses', route );

app.listen(4000, () => console.log('Server running on port 4000'));
