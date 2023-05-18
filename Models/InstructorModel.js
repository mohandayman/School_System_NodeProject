const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    _id :Number , 
    FirstName:String, 
    LastName:String,
    Age: Number, 
    salary:Number, 
    Address:{
        City:String, 
        Street:String,
        Building:Number
    },
    Courses:[String]
})
//Setter // mapping 
mongoose.model("Instructor" , schema);
// Getter
var m = mongoose.model("Instructor") 

