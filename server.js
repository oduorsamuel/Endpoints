const express = require('express')
const mongoose = require('mongoose')
const app = express();
const morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
});

app.use(morgan('dev'));

//routes to handle requests
var course= require('./routes/Courses');
var lesson= require('./routes/Lesson');
app.use('/v1/courses', course );
app.use('/v1/lessons', lesson );



//morgan error handling
var erroMessages= require('./routes/error');
app.use(erroMessages);

app.listen(4000, () => console.log('Server running on port 4000'));
