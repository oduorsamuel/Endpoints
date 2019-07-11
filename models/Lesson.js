const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let lesson=new Schema({
 lessonName:{
     type:String,
     required:true
 },
 lessonNumber:{
     type:Number,
     required:true   
 },
 numberOfQuestions:{
    type:Number,
    required:true 
},
percentComplete:{
    type:String,
    required:true 
},
note:{
    type:String,
    required:true 
},
 course:{
     type:mongoose.Schema.Types.ObjectId, ref:'Courses',
     required:true
 },
 IsDeleted: {
    type: Number,
    default: 0
},
 deleted_at:{
    type:Date,  
    default:null
},
deleted_by:{
    type:String,  
    default:null
},
updated_at:{
    type:Date,  
    default:null
},
 updated_by:{
     type:String,
     default:null
 }
},
{ versionKey: false })
module.exports=Lessons=mongoose.model('Lessons',lesson);