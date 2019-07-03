const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let Course=new Schema({
 courseName:{
     type:String,   
 },
 shortName:{
     type:String,  
 },
 description:{
     type:String,
 },
 note:{
     type:String,
 },
 questionIntro:{
     type:String,
 },
 validPeriod:{
    type:Number, 
},
})
module.exports=Courses=mongoose.model('Courses',Course);