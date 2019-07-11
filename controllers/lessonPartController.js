const LessonPart = require('../models/LessonPart');
const lessons=require('../models/Lesson')

exports.get_all_LessonParts = (req, res) => {
    LessonPart.find((err, LessonPart) => {
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
                message: 'lesson part were fetched successfully',
                data: LessonPart
            });
    })
}
exports.post_LessonPart=(req, res)=>{
    lessons.findById(req.body.LessonId)
    .exec().
    then(lesson=>{
        if(!lesson){
            res.json({
                status:"Not found",
                message:"The lesson doesnt exist"
            })
        }
        else{
            console.log(req.body.LessonId)
            LessonPart.find({ 'LessonId':req.body.LessonId,'Title':req.body.Title })
            .exec()
            .then(data=>{
                
               if(data<1){
                const userData = new LessonPart({
                    Title: req.body.Title,
                    Type:req.body.Type,
                    LessonId: req.body.LessonId,
                    CourseId: lesson.course,
                    POS: req.body.POS,
                });
                userData.save().then(result=>{
                    res.json({
                        status:"ok",
                        message:"lesson part added successfully",
                        data:result
                    })
                })
                .catch(err=>{
                    res.json({
                        status:"bad request",
                        message:"Server error",
                        data:err
                    })
                })
               }else{
                res.json({
                    status:"conflict",
                    message:"The part with the similar name already exist",
                    data:data
                })
               }
            })
            .catch(err=>{
                res.json({
                    error:err
                })
            })
        }
    })
    .catch(err=>{
        res.json(err)
    })
}

exports.get_by_id=(req, res)=>{
    LessonPart.findById(req.params.id)
    .exec()
    .then(result=>{
        if(result<1){
            res.json({
                status:"ok",
                message:"lesson part not found",
                lessonpart:result
            })
        }
        else{
            res.json({
                status:"ok",
                message:"lesson part fetched successfully",
                lessonpart:result
            })
        }

    })
    .catch(err=>{
        res.json({
            status:"bad request",
            message:"lesson part not fetched",
            error:err
        })   
    })
}