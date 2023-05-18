const mongoose = require("mongoose");
const model = require("../Models/ClassModel");
const Class = mongoose.model("Class");
const instructor = require("../Models/InstructorModel")
const InstructorSchema = mongoose.model("Instructor");
exports.GetClasses = (requst, response) => {
  Class.find({})
  .populate({path:"Instructor",select:{FirstName:1,LastName:1}})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.AddClass = async(request, response, next) => {
  try{
  let obj = new Class({
    _id: request.body._id,
    name: request.body.name,
    Instructor: request.body.Instructor,
  });
   var existInstructor = await  InstructorSchema.findOne({ _id: request.body.Instructor });
  if (existInstructor != null) {
  await  obj
      .save()
      .then((data) => {
        response.json(data);
      })
      
  } else throw new Error("the Instructor is not exist ??");
} catch(error)  {
  next(error);
}
};
exports.UpdateClass = (request, response) => {
  response.status(200).json("Update Class ");
};
exports.DeleteClass = (request, response) => {
  response.status(200).json("Delete Class ");
};

exports.GetClassByBody = function (req, res) {
  console.log(req.body);
  res.status(200).json("mohand");
};

exports.AddClassBybody = (request, response) => {
  console.log(response.body);
  response.status(200).json("by body  ");
};
