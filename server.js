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

router.route('/courses/:id').get((req, res) => {
    Courses.findById(req.params.id, (err, courses) => {
        if (err)
            console.log(err)
        else
            res.json(courses)
    });
});

router.route('/courses/add').post((req, res) => {
    let Courses = new Course(req.body);
    Courses.save()
        .then(Courses => {
            res.status(200).json({ 'course': 'added succesfully' });
            
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

app.use('/', router);
app.listen(4000, () => console.log('Server running on port 4000'));
