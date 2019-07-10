const lessonContent = require('../models/lessonContent');
const lessons=require('../models/Lesson')

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
                message: 'lesson content were fetched successfully',
                data: lessonContent
            });
    })
}
exports.post_lessonContent = (req, res) => {
    lessons.findById(req.body.LessonId, (err, lessons)=>{
        if(err){
            res.json({
                status:"not found",
                code:"",
                message:"lesson not found",
            })
        }
        else{
            const userData = {
                Title: req.body.Title,
                LessonId: req.body.LessonId,//to be replaced by req.params.lessonId
                CourseId: lessons.course,
                Type: req.body.Type,
                POS: req.body.POS,
                PartFile: req.file.path
            }
            lessonContent.findOne({ POS: req.body.POS })
                .then(found => {
                    if (!found) {
                        lessonContent.create(userData)
                            .then(content => {
                                res.json({
        
                                    status: 'created',
                                    code: '201.4.2',
                                    message: 'course created',
                                    data: content,
                                });
        
                            })
                            .catch(err => {
                                res.send({
                                    status: "bad request",
                                    code: "400.4.3",
                                    message: "failed to create content",
                                    error:err
                                })
                            })
        
                    } else {
                        res.json({ error: 'part number already exist' })
                    }
                })
                .catch(err => {
                    res.send('error:' + err)
                })

        }
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