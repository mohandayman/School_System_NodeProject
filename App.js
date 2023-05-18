// require Node packeges
const morgan = require("morgan");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
//==============  require Rout files !!  =================
const Child = require("./Routers/Child");
const Class = require("./Routers/Class");
const Teacher = require("./Routers/Teacher");
const AuthentcationRoute = require("./Routers/AuthentcationRoute");
const AdminRouter = require("./Routers/AdminRouter")
const AuthentcationMiddleWare = require("./MiddleWares/AuthentcationMiddleWare");

//================    Connect To Mongo Db  && Listen To Server    ================
mongoose
  .connect("mongodb://127.0.0.1:27017/ITI")
  .then(() => {
    server.listen(process.env.PORT || 8080, () => {
      console.log("server is listenining ,.....");
    });
  })
  .catch((error) => {
    console.log("error in connection DB " + error);
    throw new Error("Cannot Connect To DataBase !!");
  });

///===========  MiddleWares  Using ===================

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
//First Middleware   --> Morgan MiddleWare
server.use(morgan("tiny"));
// All Routes
server.use(AuthentcationRoute);
server.use(AuthentcationMiddleWare);
server.use(AdminRouter);
server.use(Teacher);
server.use(Child);
server.use(Class);

server.use((request, response, next) => {
  response.status(404).json("Page not Found");
  next();
});
server.use((error, request, response, next) => {
  response.status(500).json({ Message: "An Error 500 Acuured " + error });
});
