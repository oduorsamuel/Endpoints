const lessonPartContent = require('../models/lessonPartContent');
const LessonPart=require('../models/LessonPart')
exports.post_content = (req, res) => {
    LessonPart.findById(req.body.LessonPartId)//can be replaced by req.params
        .exec().
        then(lessonpart => {
            if (!lessonpart) {
                res.json({
                    status: "Not found",
                    message: "The lesson part doesnt exist"
                })
            }
            else {
                console.log(req.file)
                lessonPartContent.find({ 'LessonPartId': req.body.LessonPartId, 'Content': req.body.Content })
                    .exec()
                    .then(data => {

                        if (data < 1) {
                            const userData = new lessonPartContent({
                                LessonPartId: req.body.LessonPartId,
                                Type: req.body.Type,
                                CourseId: lessonpart.CourseId,
                                LessonId: lessonpart.LessonId,
                                POS: req.body.POS,
                                Content:req.body.Content,
                                File:req.file.mimetype,
                                orgfilename:req.file.originalname
                            });
                            userData.save().then(result => {
                                res.json({
                                    status: "ok",
                                    message: "lesson content part added successfully",
                                    data: result
                                })
                            })
                                .catch(err => {
                                    res.json({
                                        status: "bad request",
                                        message: "Server error",
                                        data: err
                                    })
                                })
                        } else {
                            res.json({
                                status: "conflict",
                                message: "The content part with the similar information already exist",
                                data: data
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json(err)
        })
}

exports.get_lesson_content_parts=(req , res)=>{
    lessonPartContent.find()
    .exec()
    .then(content=>{
        if(content<1){
            res.json({
                status:"ok",
                message:"No lesson part content found"
            })
        }else{
            res.json({
                status:"ok",
                message:"lesson parts content fetched",
                data:content
            })
        }
    })
    .catch(err=>{
        res.json({
            status:"bad request",
            message:"server error",
            error:err
        })
    })
}

exports.get_by_id=(req, res)=>{
 lessonPartContent.findById(req.params.id)
 .exec()
 .then(data=>{
     if(data<1){
         res.json({
             status:"ok",
             message:"requested id does not exist"
         })
     }else{
        res.json({
            status:"ok",
            message:"success",
            data:data
        }) 
     }
 })
 .catch(err=>{
    res.json({
        status:"bad request",
        message:"no data",
        error:err
    }) 
 })
}