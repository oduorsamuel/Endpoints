const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let Course=new Schema({
 courseName:{
     type:String,
     required:true   
 },
 shortName:{
     type:String,  
     required:true
 },
 description:{
     type:String,
     required:true
 },
 note:{
     type:String,
     required:true
 },
 questionIntro:{
     type:String,
     required:true
 },
 validPeriod:{
    type:Number,
    required:true 
},
},
{ versionKey: false })
module.exports=Courses=mongoose.model('Courses',Course);