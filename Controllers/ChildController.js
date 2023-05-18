const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../Models/ChildModel");
const ChildSchema = mongoose.model("Child");
exports.GetChildren = function (request, response, next) {
  ChildSchema.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.AddChild =async function (request, response, next) {
  let newChild = new ChildSchema({
    _id: request.body.id,
    UserName: request.body.UserName,
    Password:await bcrypt.hash(request.body.Password,10) ,
  });
  newChild
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
exports.UpdateChild = async function (request, response, next) {
  try{
  var Updatedchild = await ChildSchema.updateOne(
    { _id: request.body.id },{$set :  { UserName: request.body.UserName, Password: request.body.Password }}

  );
  response.json(Updatedchild)
  }
  catch(error){next(error)}
};
exports.DeleteChild = function (request, response,error) {
ChildSchema.deleteOne({_id : request.body.id})
.then(data => {response.json(data)})
.catch(error => {next(error)})
};

exports.GetChild = function (req, res) {
  res.status(200).json("Get One Child by Id ");
};
exports.AddChildById = function (req, res) {
  res.status(200).json("ADD One Child by Id ");
};
exports.UpdateChildById = function (req, res) {
  res.status(200).json("Update One Child by Id");
};
exports.DeleteChildById = function (req, res) {
  res.status(200).json("Delete One Child by Id ");
};
