const express = require('express')
const cors = require('cors')
const router=express.Router();
const multer= require ('multer');
const storage=multer.diskStorage({
    destination:function(req, file , cb){
      cb(null, './uploads/')
    },
    filename:function(req, file, cb){
        cb(null, new Date().toDateString() + file.originalname)   
    },
});
// const fileFilter=function(req,file,cb){
//     if(file.mimetype==="image.jpeg"||file.mimetype==="image.png"){
//        cb(null, true)
       
//     }
//     else{
//         cb(null, false)
//     }
// }
const upload=multer(
    {storage:storage,
    limits:{
    fileSize:1024*1024*10
    },
    // fileFilter:fileFilter
})
const bodyparser = require('body-parser')
const Courses = require('../models/Courses')


router.use(cors());
router.use(bodyparser.json());

//APIs
router.get('/',(req, res) => {
    Courses.find((err, courses) => {
        if (err)
        res.json({
                            
            status:'bad request',
            code:"400.4.1",
            message:'bad request', 
            error:err  
        
            });
        else
        res.json({
                            
            status:'ok',
            code:"200.4.1",
            message:'courses were fetched successfully',
            data:courses  
        
            });


    })
});

router.get('/:id',(req, res) => {
    Courses.findById(req.params.id, (err, course) => {
        if (err)
            console.log(err)
        else
        res.json({
                            
            status:'ok',
            code:"200.4.1",
            message:'course fetched successfully',
            data:course
        
            });
    });
});

router.post('/', upload.single('coursefile'),(req, res) => {
    console.log(req.file)
    const userData = {
        courseName: req.body.courseName,
        shortName: req.body.shortName,
        description: req.body.description,
        note: req.body.note,
        questionIntro: req.body.questionIntro,
        validPeriod: req.body.validPeriod,
        coursefile:req.file.path
    }
    Courses.findOne({ courseName: req.body.courseName })
        .then(course => {
            if (!course) {
                Courses.create(userData)
                    .then(course => {
                        res.json({
                            
                            status:'created',
                            code:'201.4.3',
                            message:'course created', 
                            data:course  
                        
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
})


router.post('/:id',(req, res) => {
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
            Courses.save().then(Courses => {
                res.json({
                            
                    status:'ok',
                    code:'200.4.4',
                    message:'course update success', 
                    data:Courses  
                
                    });
            }).catch(err => {
                res.json({
                            
                    status:'bad request',
                    code:'400.4.4',
                    message:'bad request update failed', 
                    error:err  
                
                    });
            });
        }
    });
});

router.delete('/:id',(req, res) => {
    Courses.findByIdAndRemove({ _id: req.params.id }, (err, Courses) => {
        if (err)
            res.json(err)
        else
        res.json({
                            
            status:'ok',
            code:'200.4.5',
            message:'course delete success', 
            data:err
        
            });

    })
})

router.delete('/',(req, res) => {
    Courses.find((err, courses) => {
        if (err)
            console.log(err)
        else
            res.json('All');

    })
})
module.exports=router