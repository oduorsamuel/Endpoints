const express = require('express')
const cors = require('cors')
const router=express.Router();
const bodyparser = require('body-parser')
const Courses = require('../models/Courses')


router.use(cors());
router.use(bodyparser.json());

//APIs
router.get('/',(req, res) => {
    Courses.find((err, courses) => {
        if (err)
            console.log(err)
        else
            res.json(courses);


    })
});

router.get('/:id',(req, res) => {
    Courses.findById(req.params.id, (err, courses) => {
        if (err)
            console.log(err)
        else
            res.json(courses)
    });
});

router.post('/',(req, res) => {
    const userData = {
        courseName: req.body.courseName,
        shortName: req.body.shortName,
        description: req.body.description,
        note: req.body.note,
        questionIntro: req.body.questionIntro,
        validPeriod: req.body.validPeriod,
    }
    Courses.findOne({ courseName: req.body.courseName })
        .then(course => {
            if (!course) {
                Courses.create(userData)
                    .then(course => {
                        res.json({ status: course.courseName + '  Registered successfully' });
                        
                    })
                    .catch(err => {
                        res.send('error' + err)
                    })

            } else {
                res.json({ error: 'Course name already exist' })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})


router.post('/:id',(req, res) => {
    Courses.findById(req.params.id, (err, Courses) => {
        if (!Courses)
            return (err)
        else {
            Courses.courseName = req.body.courseName;
            Courses.shortName = req.body.shortName;
            Courses.description = req.body.description;
            Courses.note = req.body.note;
            Courses.questionIntro = req.body.questionIntro;
            Courses.validPeriod = req.body.validPeriod;
            Courses.save().then(Courses => {
                res.json('course updated successfully');
            }).catch(err => {
                res.status(400).send('course update failed');
            });
        }
    });
});

router.delete('/:id',(req, res) => {
    Courses.findByIdAndRemove({ _id: req.params.id }, (err, Courses) => {
        if (err)
            res.json(err)
        else
            res.json('Course removed successfully')

    })
})

router.delete('/',(req, res) => {
    Courses.find((err, courses) => {
        if (err)
            console.log(err)
        else
            res.json('All');

    })
})
module.exports=router