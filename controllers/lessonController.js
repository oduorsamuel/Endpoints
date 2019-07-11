const Lessons = require('../models/Lesson');
const Courses = require('../models/Courses');

exports.get_all_lessons = (req, res, next) => {
    Lessons.find()
        .populate('course', 'courseName')
        .exec()
        .then(lesson => {
            res.json({
                status: "Ok",
                code: "200.4.10",
                message: "lessons fetched successfully",
                data: lesson.map(lesson => {
                    return {
                        Data: lesson,
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.11",
                message: "Server error",
                error: err
            })
        })
}
exports.post_lesson=(req, res)=>{
    Courses.findById(req.body.courseId)
    .exec()
    .then(data=>{
        if(data<1){
            res.json({
                status:"Not found",
                message:"course not found",
                data:data
            })
        }
        else{
            Lessons.find({"course":req.body.courseId,"lessonName":req.body.lessonName})
            .exec()
            .then(conflict=>{
                if(conflict<1){
                    const lessonData = new Lessons({
                    lessonName: req.body.lessonName,
                    lessonNumber: req.body.lessonNumber,
                    numberOfQuestions: req.body.numberOfQuestions,
                    percentComplete: req.body.percentComplete,
                    note: req.body.note,
                    course: req.body.courseId,
                });
                lessonData.save()
                .then(savedLessons=>{
                    res.json({
                        status:"ok",
                        message:"lesson saved for the course",
                        data:savedLessons
                    })
                })
                .catch(err=>{
                    res.json({
                        status:"bad request",
                        message:"unable to save the lesson",
                        error:err
                    })
                })
                }
                else{
                    res.json({
                        status:"conflict",
                        message:"similar lesson already exist"
                    })
                }
            })
            .catch(err=>{
                res.json({
                    message:"validation error",
                    error:err
                })
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"error when trying to get a lesson",
            error:err
        })
    })
}
exports.get_by_id = (req, res, next) => {
    Lessons.findById(req.params.id)
        .populate('course')
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.14",
                message: "lesson fetched",
                data: lesson,
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.15",
                message: "lesson not fetched",
                data: err
            })
        })

}

exports.delete_by_id =  (req, res) => {
    Lessons.findById(req.params.id, (err, Lesson) => {
        if (!Lesson)
            res.json({
                status: "not found",
                code: "404.4.20",
                message: "lessons not found",
            })
        else {
            Lesson.lessonName = req.body.lessonName;
            Lesson.lessonNumber = req.body.lessonNumber;
            Lesson.numberOfQuestions = req.body.numberOfQuestions;
            Lesson.percentComplete = req.body.percentComplete;
            Lesson.note = req.body.note;
            Lesson.deleted_by ="Dev";//req,params.userId
            Lesson.course = req.body.courseId,
                Lesson.deleted_at = Date.now()
            Lesson.save()
                .then(lesson => {
                    res.json({

                        status: 'ok',
                        code: '200.4.16',
                        message: 'lesson delete success',
                        data: lesson,
                    });
                }).catch(err => {
                    res.json({

                        status: 'bad request',
                        code: '400.4.17',
                        message: 'bad request deletes failed',
                        error: err

                    });
                });
        }
    });
}

exports.delete_all = (req, res) => {
    Lessons.remove()
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.18",
                message: "all lessons removed",
                url: {
                    type: 'POST',
                    body: {
                        lessonName: "String",
                        lessonNumber: "Number",
                        numberOfQuestions: "Number",
                        percentComplete: "String",
                        note: "String"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.19",
                message: "lessons not deleted",
                data: err
            })
        })
}

exports.update = (req, res) => {
    Lessons.findById(req.params.id, (err, Lesson) => {
        if (!Lesson)
            res.json({
                status: "not found",
                code: "404.4.20",
                message: "lessons not found",
            })
        else {
            Lesson.lessonName = req.body.lessonName;
            Lesson.lessonNumber = req.body.lessonNumber;
            Lesson.numberOfQuestions = req.body.numberOfQuestions;
            Lesson.percentComplete = req.body.percentComplete;
            Lesson.note = req.body.note;
            Lesson.updated_by ="Dev";//req,params.userid
            Lesson.course = req.body.courseId,
                Lesson.updated_at = Date.now()
            Lesson.save()
                .then(lesson => {
                    res.json({

                        status: 'ok',
                        code: '200.4.21',
                        message: 'lesson update success',
                        data: lesson,
                    });
                }).catch(err => {
                    res.json({

                        status: 'bad request',
                        code: '400.4.22',
                        message: 'bad request update failed',
                        error: err

                    });
                });
        }
    });
}