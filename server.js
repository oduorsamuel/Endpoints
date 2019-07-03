const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Courses = require('./models/Courses')
const Course = require('./models/Courses')

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/courses',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
});

//APIs
router.route('/courses').get((req, res) => {
    Courses.find((err, courses) => {
        if (err)
            console.log(err)
        else
            res.json(courses);


    })
});

app.use('/', router);
app.listen(4000, () => console.log('Server running on port 4000'));
