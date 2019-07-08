const Courses = require('../models/Courses');

exports.get_all_course = (req, res) => {
    Courses.find((err, courses) => {
        if (err)
            res.json({

                status: 'bad request',
                code: "400.4.1",
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
                        url: [{
                            type: 'GET',
                            url: 'localhost:4000/v1/courses/' + course._id
                        }, {
                            type: 'DELETE',
                            url: 'localhost:4000/v1/courses/' + course._id
                        }]
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
                            code: '201.4.3',
                            message: 'course created',
                            data: course,
                            url: [{
                                type: 'PATCH',
                                url: 'localhost:4000/v1/courses/' + course._id,
                            }, {
                                type: 'DELETE',
                                url: 'localhost:4000/v1/courses/' + course._id
                            }]
                        });

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
}

exports.get_by_id = (req, res) => {
    Courses.findById(req.params.id, (err, course) => {
        if (err)
            res.json({
                status: 'bad request',
                code: "400.4.0",
                message: 'failled',
                data: err,
            })
        else
            res.json({

                status: 'ok',
                code: "200.4.1",
                message: 'course fetched successfully',
                data: course,
                url: {
                    type: 'DELETE',
                    url: 'localhost:4000/v1/courses/' + course._id
                }

            });
    });
}

exports.delete_by_id = (req, res) => {
    Courses.findByIdAndRemove({ _id: req.params.id }, (err, Courses) => {
        if (err)
            res.json(err)
        else
            res.json({

                status: 'ok',
                code: '200.4.5',
                message: 'course delete success',
                data: err,
                url: {
                    type: 'POST',
                    url: 'localhost:4000/v1/courses',
                    body: {
                        courseName: "String",
                        shortName: "String ",
                        description: "String ",
                        note: "String",
                        questionIntro: "String ",
                        validPeriod: Number,
                        coursefile: "image"
                    }
                }

            });

    })
}

exports.delete_all = (req, res) => {
    Courses.remove()
        .exec()
        .then(result => {
            res.json({

                status: 'ok',
                code: '200.4.6',
                message: 'deleted all courses',
                data: result,
                url: {
                    type: 'POST',
                    url: 'localhost:4000/v1/courses',
                    body: {
                        courseName: "String",
                        shortName: "String ",
                        description: "String ",
                        note: "String",
                        questionIntro: "String ",
                        validPeriod: Number,
                        coursefile: "image"
                    }
                }

            });
        })
        .catch(err => {
            res.json(
                {
                    error: err
                }
            )
        })

}

exports.update = (req, res) => {
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
            Courses.coursefile = req.body.path
            Courses.save().then(Courses => {
                res.json({

                    status: 'ok',
                    code: '200.4.4',
                    message: 'course update success',
                    data: Courses,
                    url: [{
                        type: 'GET',
                        url: 'localhost:4000/v1/courses/' + courses._id,
                    }, {
                        type: 'DELETE',
                        url: 'localhost:4000/v1/courses/' + courses._id
                    }]

                });
            }).catch(err => {
                res.json({

                    status: 'bad request',
                    code: '400.4.4',
                    message: 'bad request update failed',
                    error: err

                });
            });
        }
    });
}