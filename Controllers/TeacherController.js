const InstructorModel = require("../Models/InstructorModel");
const mongoose = require("mongoose");
const InstructorSchema = mongoose.model("Instructor");

exports.GetTeacher = (request, response,next) => {
  // if(request.Authontecation.role == "Child")
  // {
  //   next (new Error("No Privilige for this Operation The Role : " + request.Authontecation.role))
  // }
  InstructorSchema.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.AddTeacher = (request, response, next) => {
  const Instructor = new InstructorSchema({
    _id: request.body.id,
    FirstName: request.body.FirstName,
    LastName: request.body.LastName,
    Age: request.body.Age,
    Salary: request.body.Salary,
    Address: {
      City: request.body.Address.City,
      Street: request.body.Address.Street,
      Building: request.body.Address.Building,
    },
    Courses: request.body.Courses,
  });
  Instructor.save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.UpdateTeacher = async (request, response, next) => {
  try {
    let UpdatedInstructor = await InstructorSchema.findOne({
      _id: request.body.id,
    });
    (UpdatedInstructor.FirstName = request.body.FirstName),
      (UpdatedInstructor.LastName = request.body.LastName),
      (UpdatedInstructor.Age = request.body.Age),
      (UpdatedInstructor.Salary = request.body.Salary),
      (UpdatedInstructor.Address = request.body.Address),
      (UpdatedInstructor.Address.City = request.body.Address.City),
      (UpdatedInstructor.Address.Street = request.body.Address.Street),
      (UpdatedInstructor.Address.Building = request.body.Address.Building);

    let savedInstructor = await UpdatedInstructor.save();
    response.json(savedInstructor);
  } catch (error) {
    next(error);
  }
};
exports.DeleteTeacher = async (request, response, next) => {
  try {
    let DeletedInstructor = await InstructorSchema.deleteOne({
      _id: request.body.id,
    });
    if (!DeletedInstructor) {
      throw new Error("the Instructor Not Find");
    }
    else
    response.json(DeletedInstructor.deletedCount + " Document Is Deleted !!");
  } catch (error) {
    next(error);
  }
};

exports.GetOneTeacher = function (request, response, next) {
  InstructorSchema.findOne({ _id: request.params._id })
    .then((data) => {
      if (data == null) {
        throw new Error("The Instructor NOt Exists ?");
      }
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
