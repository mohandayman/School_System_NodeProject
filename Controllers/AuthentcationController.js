const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { AddChild } = require("./ChildController");
const bcrypt = require("bcrypt");
require("../Models/ChildModel");
const childschema = mongoose.model("Child");
require("../Models/Admin");
const AdminModel = mongoose.model("Admin");

exports.Authentcation = async (request, response, next) => {
  try {
   var ChildResult = await childschema.findOne({UserName: request.body.UserName})
    // Check If Child is Found UserName is Valid
        if (ChildResult != null) { // Case  Found
   let result =   await  bcrypt.compare(request.body.Password , ChildResult.Password  ); // check on The Password 
   if(result == true ) //Case Password Is Valid
        {  const Childtoken = jwt.sign(
            {
              id: ChildResult._id,
              role: "Child",
              UserName: request.body.UserName,
              Password: request.body.Password,
            },
            "mohandSecretKey",
            { expiresIn: "1h" }
          );
          response.status(200).json({ data: "DATA Is valid  role : Child", Childtoken });
        }
        else {
          throw new Error("Wrong Password for Child  !!");
        }
        } 
        else // Case Not Found In Child Serch In Admin 
         {
           let AdminResult = await AdminModel.findOne({UserName: request.body.UserName });// Serch In Admin 
           if (AdminResult != null) {
             
          let result =   await  bcrypt.compare( request.body.Password , AdminResult.Password ); // check on The Password 
            if(result == true)
            {
            const Admintoken = jwt.sign(
              {
                id: AdminResult._id,
                role: "Admin",
                UserName: request.body.UserName,
                Password: request.body.Password,
              },
              "mohandSecretKey",
              { expiresIn: "1h" }
            );
            response.status(200).json({ data: "DATA Is valid Role : Admin ", Admintoken });
            }
            else {
              throw new Error("Wrong Password for Admin  !!");
            }
          } else {
            throw new Error("Not Athenticated Login Wrong UserName !!");
          }
        }
      }
    
  catch (error) {
    next(error);
  }
};
