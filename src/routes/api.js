import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers);   //method get => read data
  router.post("/create-user", APIController.createNewUser);  //method post, create data
  router.put("/update-user", APIController.updateUser);  //method put, update data
  router.delete("/delete-user/:userId", APIController.deleteUser)

  return app.use("/api/v1", router); //tiền tố mặc định của website, ở đây là không dùng gì cả, vidu /api/version
};

export default initAPIRoute;
