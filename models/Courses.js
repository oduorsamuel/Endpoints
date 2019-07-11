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
coursefile:{
    type:String,
    required:true 
},
IsDeleted: {
    type: Number,
    default: 0
},
DeletedAt:{
    type:Date,  
    default:null
},
DeletedBy:{
    type:String,  
    default:null
},
UpdatedAt:{
    type:Date,  
    default:null
},
 UpdatedBy:{
     type:String,
     default:null
 }
},
{ versionKey: false })
module.exports=Courses=mongoose.model('Courses',Course);