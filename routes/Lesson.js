const express = require('express')
const router = express.Router();
const bodyparser = require('body-parser')
const Lessons = require('../models/Lesson')
const Courses = require('../models/Courses')
router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json());



//APIs

router.post('/',(req, res) => {
    Courses.findById(req.body.courseId)
    .then(courses=>{
        if(!courses){
            res.json({
                status:"Not found",
                code:"404.4.7",
                message:"course not found"
            })
        }
        else{
            const lessonData =new Lessons({
                lessonName: req.body.lessonName,
                startDate: req.body.startDate,
                signUpStartDate: req.body.signUpStartDate,
                signUpEndDate: req.body.signUpEndDate,
                endDate: req.body.endDate,
                passWithin: req.body.passWithin,
                course: req.body.courseId,
                teacher:req.body.teacher
            });
            lessonData.save()
            .then(result=>{
                res.json({
                    status:"created",
                    code:"201.4.8",
                    url: [{
                        type: 'GET',
                        url: 'localhost:4000/v1/lessons/' + result._id,
                    },{
                        type: 'DELETE',
                        url: 'localhost:4000/v1/lessons/' + result._id
                    }],
                    data:result
                })
            })
            .catch(err=>{
                res.json({
                    status:"ok",
                    code:"400.4.9",
                    message:"bad request",
                    error:err
                })
            })
        }
    })
})

router.get('/',(req,res,next)=>{
    Lessons.find()
    .populate('course')
    .exec()
    .then(lesson=>{
        res.json({
            status:"Ok",
            code:"200.4.10",
            message:"lessons fetched successfully",
            data:lesson
        })
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            code:"400.4.11",
            message:"Server error",
            error:err
        })
    })
})
module.exports = router