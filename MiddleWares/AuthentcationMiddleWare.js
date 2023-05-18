const jwt = require("jsonwebtoken");


// Method to Verify the user Check Authentication ?


module.exports = function (request, response, next) {
    try{
  const token = request.get("authorization").split(" ")[1];
 const decodedToken =  jwt.verify(token,"mohandSecretKey")
  console.log(decodedToken);
  console.log(token);
  request.Authontecation = decodedToken;
  next();
    }catch(error){
        throw new Error ("not Authenticated ?")
    }
};

//====> Admin Check Method 
module.exports.CheckAdmin = function(request , response , next ){
  if(request.Authontecation.role == "Admin"){
    next()
  }
  else {
    next(new Error("Not Authorized !!"))
  }
}

//===>  CHild Check Mehod
module.exports.CheckChild = function(request , response , next ){
  if(request.Authontecation.role == "Child"){
    next()
  }
  else {
    next(new Error("Not Authorized !!"))
  }
}
