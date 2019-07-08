const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let lesson=new Schema({
 lessonName:{
     type:String,
     required:true
 },
 startDate:{
     type:Date,
     default:Date.now()   
 },
 signUpStartDate:{
    type:Date,
    default:Date.now()   
},
signUpEndDate:{
    type:Date,
    default:Date.now()   
},
endDate:{
    type:Date,
    default:Date.now()  
},
 passWithin:{
     type:Number,  
     required:true
 },
 course:{
     type:mongoose.Schema.Types.ObjectId, ref:'Courses',
     required:true
 },
 teacher:{
     type:String,
     required:true
 }
},
{ versionKey: false })
module.exports=Lessons=mongoose.model('Lessons',lesson);