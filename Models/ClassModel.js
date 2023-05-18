const mongoose = require("mongoose")
const ClassSchema = mongoose.Schema({
    _id :Number, 
    name:{type:String , require:true},
    Instructor : {type:Number, ref:"Instructor"}
})
 mongoose.model("Class" , ClassSchema);