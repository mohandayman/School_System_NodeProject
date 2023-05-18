const mongoose = require("mongoose")
const AutoIncreamentPackege = require("mongoose-plugin-autoinc");
const ChildSchema = mongoose.Schema({
    _id :Number, 
    UserName:{type:String , require:true},
    Password :{type:String , require:true}
})

ChildSchema.plugin(AutoIncreamentPackege.plugin, {
    model: "Child",
    field: "_id",
    startAt: 10,
    incrementBy: 1,
  });

 mongoose.model("Child" , ChildSchema);