const lessonContent = require('../models/lessonContent');

exports.get_all_lessonContent = (req, res) => {
    lessonContent.find((err, lessonContent) => {
        if (err)
            res.json({

                status: 'bad request',
                code: "400.4.0",
                message: 'bad request',
                error: err
            });
        else
            res.json({

                status: 'ok',
                code: "200.4.1",
                message: 'lessonContent were fetched successfully',
                data: lessonContent
            });
    })
}
exports.post_course = (req, res) => {
    console.log(req.file)
    const userData = {
        courseName: req.body.courseName,
        shortName: req.body.shortName,
        description: req.body.description,
        note: req.body.note,
        questionIntro: req.body.questionIntro,
        validPeriod: req.body.validPeriod,
        coursefile: req.file.path
    }
    lessonContent.findOne({ courseName: req.body.courseName })
        .then(course => {
            if (!course) {
                lessonContent.create(userData)
                    .then(course => {
                        res.json({

                            status: 'created',
                            code: '201.4.2',
                            message: 'course created',
                            data: course,
                        });

                    })
                    .catch(err => {
                        res.send({
                            status: "bad request",
                            code: "400.4.3",
                            message: "failed to create course"
                        })
                    })

            } else {
                res.json({ error: 'Course name already exist' })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
}

exports.get_by_id = (req, res) => {
    lessonContent.findById(req.params.id, (err, course) => {
        if (err)
            res.json({
                status: 'bad request',
                code: "400.4.4",
                message: 'failled get specific course',
                data: err,
            })
        else
            res.json({

                status: 'ok',
                code: "200.4.5",
                message: 'course fetched successfully',
                data: course,
            });
    });
}

exports.delete_by_id = (req, res) => {
    lessonContent.findById(req.params.id, (err, lessonContent) => {
        if (!lessonContent)
            return (err)
        else {
            lessonContent.courseName = req.body.courseName;
            lessonContent.shortName = req.body.shortName;
            lessonContent.description = req.body.description;
            lessonContent.note = req.body.note;
            lessonContent.questionIntro = req.body.questionIntro;
            lessonContent.validPeriod = req.body.validPeriod;
            lessonContent.coursefile = req.file.path;
            lessonContent.deleted_by = "Dev";//req,params.userid
            lessonContent.deleted_at = Date.now();
            lessonContent.save().then(lessonContent => {
                res.json({

                    status: 'ok',
                    code: '200.4.5',
                    message: 'course delete success',
                    data: lessonContent,
                });
            }).catch(err => {
                res.json({

                    status: 'bad request',
                    code: '400.4.6',
                    message: 'bad request update failed',
                    error: err

                });
            });
        }
    });
}
exports.update = (req, res) => {
    lessonContent.findById(req.params.id, (err, lessonContent) => {
        if (!lessonContent)
            return (err)
        else {
            lessonContent.courseName = req.body.courseName;
            lessonContent.shortName = req.body.shortName;
            lessonContent.description = req.body.description;
            lessonContent.note = req.body.note;
            lessonContent.questionIntro = req.body.questionIntro;
            lessonContent.validPeriod = req.body.validPeriod;
            lessonContent.coursefile = req.file.path;
            lessonContent.updated_by = "Dev";//req,params.userid
            lessonContent.updated_at = Date.now();
            lessonContent.save().then(lessonContent => {
                res.json({

                    status: 'ok',
                    code: '200.4.8',
                    message: 'course update success',
                    data: lessonContent,
                });
            }).catch(err => {
                res.json({

                    status: 'bad request',
                    code: '400.4.9',
                    message: 'bad request update failed',
                    error: err

                });
            });
        }
    });
}