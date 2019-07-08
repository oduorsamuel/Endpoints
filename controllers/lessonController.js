const Lessons = require('../models/Lesson');
const Courses = require('../models/Courses');

exports.get_all_lessons = (req, res, next) => {
    Lessons.find()
        .populate('course')
        .exec()
        .then(lesson => {
            res.json({
                status: "Ok",
                code: "200.4.10",
                message: "lessons fetched successfully",
                data: lesson
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
exports.post_lesson = (req, res) => {
    Courses.findById(req.body.courseId)
        .then(courses => {
            if (!courses) {
                res.json({
                    status: "Not found",
                    code: "404.4.7",
                    message: "course not found"
                })
            }
            else {
                const lessonData = new Lessons({
                    lessonName: req.body.lessonName,
                    startDate: req.body.startDate,
                    signUpStartDate: req.body.signUpStartDate,
                    signUpEndDate: req.body.signUpEndDate,
                    endDate: req.body.endDate,
                    passWithin: req.body.passWithin,
                    course: req.body.courseId,
                    teacher: req.body.teacher
                });
                lessonData.save()
                    .then(result => {
                        res.json({
                            status: "created",
                            code: "201.4.8",
                            url: [{
                                type: 'GET',
                                url: 'localhost:4000/v1/lessons/' + result._id,
                            }, {
                                type: 'DELETE',
                                url: 'localhost:4000/v1/lessons/' + result._id
                            }],
                            data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "ok",
                            code: "400.4.9",
                            message: "bad request",
                            error: err
                        })
                    })
            }
        })
}

exports.get_by_id = (req, res, next) => {
    Lessons.findById(req.params.id)
        .populate('course')
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.12",
                message: "lesson fetched",
                data: lesson
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.13",
                message: "lesson not fetched",
                data: err
            })
        })

}

exports.delete_by_id = (req, res) => {
    Lessons.findByIdAndRemove(req.params.id)
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.14",
                message: "lesson deleted successfully"
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.15",
                message: "lesson not deleted",
                data: err
            })
        })
}

exports.delete_all = (req, res) => {
    Lessons.remove()
        .exec()
        .then(lesson => {
            res.json({
                status: "ok",
                code: "200.4.16",
                message: "all lessons removed",
                data: lesson
            })
        })
        .catch(err => {
            res.json({
                status: "bad request",
                code: "400.4.17",
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
                code: "404.4.18",
                message: "lessons not found",
            })
        else {
            Lesson.lessonName = req.body.lessonName;
            Lesson.startDate = req.body.startDate;
            Lesson.signUpStartDate = req.body.signUpStartDate;
            Lesson.signUpEndDate = req.body.signUpEndDate;
            Lesson.endDate = req.body.endDate;
            Lesson.passWithin = req.body.passWithin;
            Lesson.course = req.body.courseId,
                Lesson.teacher = req.body.teacher
            Lesson.save()
                .then(lesson => {
                    res.json({

                        status: 'ok',
                        code: '200.4.19',
                        message: 'lesson update success',
                        data: lesson,
                        url: [{
                            type: 'GET',
                            url: 'localhost:4000/v1/lessons/' + lesson._id,
                        }, {
                            type: 'DELETE',
                            url: 'localhost:4000/v1/lessons/' + lesson._id
                        }]

                    });
                }).catch(err => {
                    res.json({

                        status: 'bad request',
                        code: '400.4.20',
                        message: 'bad request update failed',
                        error: err

                    });
                });
        }
    });
}