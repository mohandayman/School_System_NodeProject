
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../Models/Admin");
const AdminModel = mongoose.model("Admin");
exports.GetAllAdmins = (request, response, next) => {
  AdminModel.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.AddAdmin =async (request, response, next) => {
  let NewAdmin = new AdminModel({
    _id: request.body.id,
    UserName: request.body.UserName,
    Password: await bcrypt.hash(request.body.Password,10) ,
    Gender: request.body.Gender,
    InstructorId: request.body.InstructorId,
    ChildrenIds: request.body.ChildrenIds,
  });
  NewAdmin.save()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.DeleteAdmin = (request, response, next) => {
  AdminModel.deleteOne({ _id: request.body.id })
    .then((DeletedInfo) => {
      if (DeletedInfo != null) {
        response.status(200).json(DeletedInfo);
      } else {
        throw new Error("No Document match the Condition !!");
      }
    })
    .catch((error) => {
      next(error);
    });
};
