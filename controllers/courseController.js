const Courses = require('../models/Courses');

exports.get_all_course = (req, res) => {
    Courses.find((err, courses) => {
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
                message: 'courses were fetched successfully',
                data: courses.map(course => {
                    return {
                        Data: course,
                    }
                })
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
    
    Courses.findOne({ courseName: req.body.courseName })
        .then(course => {
            if (!course) {
                Courses.create(userData)
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
    Courses.findById(req.params.id, (err, course) => {
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
    Courses.findById(req.params.id)
        .then(Courses => {
            if (Courses < 1) {
                res.json({
                    status: "ok",
                    message: "invalid id"
                })
            }
            else {
                Courses.courseName = req.body.courseName;
                Courses.shortName = req.body.shortName;
                Courses.description = req.body.description;
                Courses.note = req.body.note;
                Courses.questionIntro = req.body.questionIntro;
                Courses.validPeriod = req.body.validPeriod;
                Courses.coursefile = req.file.path;
                Courses.DeleteddBy = "Dev";//req,params.userid
                Courses.DeletedAt = Date.now();
                Courses.IsDeleted = 1
                Courses.save()
                    .then(deletedcontent => {
                        res.json({
                            status: "ok",
                            message: "success",
                            data: deletedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                error: err
            })
        })
}
exports.update = (req, res) => {
    Courses.findById(req.params.id)
        .then(Courses => {
            if (Courses < 1) {
                res.json({
                    status: "ok",
                    message: "invalid id"
                })
            }
            else {
                Courses.courseName = req.body.courseName;
                Courses.shortName = req.body.shortName;
                Courses.description = req.body.description;
                Courses.note = req.body.note;
                Courses.questionIntro = req.body.questionIntro;
                Courses.validPeriod = req.body.validPeriod;
                Courses.coursefile = req.file.path;
                Courses.UpdatedBy = "Dev";//req,params.userid
                Courses.UpdatedAt = Date.now();
                Courses.save()
                    .then(updatedcontent => {
                        res.json({
                            status: "ok",
                            message: "success",
                            data: updatedcontent
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "bad request",
                            code: "",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "bad request",
                error: err
            })
        })
}