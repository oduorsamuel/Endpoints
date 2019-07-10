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
// exports.post_LessonPart = (req, res) => {
//     lessons.findById(req.body.LessonId, (err, lessons)=>{
//         if(err){
//             res.json({
//                 status:"not found",
//                 code:"",
//                 message:"lesson not found",
//             })
//         }
//         else{
//             const userData = {
//                 Title: req.body.Title,
//                 LessonId: req.body.LessonId,//to be replaced by req.params.lessonId
//                 CourseId: lessons.course,
//                 Type: req.body.Type,
//                 POS: req.body.POS,
//             }
//             LessonPart.findOne({ POS: req.body.POS })
//                 .then(found => {
//                     if (!found) {
//                         LessonPart.create(userData)
//                             .then(content => {
//                                 res.json({
        
//                                     status: 'created',
//                                     code: '201.4.2',
//                                     message: 'lesson part created',
//                                     data: content,
//                                 });
        
//                             })
//                             .catch(err => {
//                                 res.send({
//                                     status: "bad request",
//                                     code: "400.4.3",
//                                     message: "failed to create content",
//                                     error:err
//                                 })
//                             })
        
//                     } else {
//                         res.json({ error: 'part number already exist' })
//                     }
//                 })
//                 .catch(err => {
//                     res.send('error:' + err)
//                 })

//         }
//     })

// }

// exports.get_by_id = (req, res) => {
//     LessonPart.findById(req.params.id, (err, course) => {
//         if (err)
//             res.json({
//                 status: 'bad request',
//                 code: "400.4.4",
//                 message: 'failled get specific course',
//                 data: err,
//             })
//         else
//             res.json({

//                 status: 'ok',
//                 code: "200.4.5",
//                 message: 'course fetched successfully',
//                 data: course,
//             });
//     });
// }

// exports.delete_by_id = (req, res) => {
//     LessonPart.findById(req.params.id, (err, LessonPart) => {
//         if (!LessonPart)
//             return (err)
//         else {
//             LessonPart.courseName = req.body.courseName;
//             LessonPart.shortName = req.body.shortName;
//             LessonPart.description = req.body.description;
//             LessonPart.note = req.body.note;
//             LessonPart.questionIntro = req.body.questionIntro;
//             LessonPart.validPeriod = req.body.validPeriod;
//             LessonPart.coursefile = req.file.path;
//             LessonPart.deleted_by = "Dev";//req,params.userid
//             LessonPart.deleted_at = Date.now();
//             LessonPart.save().then(LessonPart => {
//                 res.json({

//                     status: 'ok',
//                     code: '200.4.5',
//                     message: 'course delete success',
//                     data: LessonPart,
//                 });
//             }).catch(err => {
//                 res.json({

//                     status: 'bad request',
//                     code: '400.4.6',
//                     message: 'bad request update failed',
//                     error: err

//                 });
//             });
//         }
//     });
// }
// exports.update = (req, res) => {
//     LessonPart.findById(req.params.id, (err, LessonPart) => {
//         if (!LessonPart)
//             return (err)
//         else {
//             LessonPart.courseName = req.body.courseName;
//             LessonPart.shortName = req.body.shortName;
//             LessonPart.description = req.body.description;
//             LessonPart.note = req.body.note;
//             LessonPart.questionIntro = req.body.questionIntro;
//             LessonPart.validPeriod = req.body.validPeriod;
//             LessonPart.coursefile = req.file.path;
//             LessonPart.updated_by = "Dev";//req,params.userid
//             LessonPart.updated_at = Date.now();
//             LessonPart.save().then(LessonPart => {
//                 res.json({

//                     status: 'ok',
//                     code: '200.4.8',
//                     message: 'course update success',
//                     data: LessonPart,
//                 });
//             }).catch(err => {
//                 res.json({

//                     status: 'bad request',
//                     code: '400.4.9',
//                     message: 'bad request update failed',
//                     error: err

//                 });
//             });
//         }
//     });
// }