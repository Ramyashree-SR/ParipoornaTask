const mongoose=require('mongoose')
const Schema=mongoose.Schema

let formDataSchema=new Schema({
     fName:{
         type:String,
         minLength:2,
         maxLength:20,
        //  require:true
     },
     lName:{
        type:String,
        minLength:2,
        maxLength:20,
        // require:true
    },
   dob:{
        type:String,
        min:1,
        max:50,
    },
    age:{
        type:Number,
        min:1,
        max:100,
    },
    emailId:{
        type:String,
        minLength:2,
        maxLength:20,
        // require:true
    },
    phNo:{
        type:Number,
        // require:true
    },
   address:{
        type:String,
        minLength:2,
        maxLength:20,
        // require:true
    },

})

module.exports=mongoose.model("FormData",formDataSchema)