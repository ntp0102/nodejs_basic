import express from "express";

const bodyParser = require("body-parser");

// Configurations for "body-parser"

const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.set("view engine", "ejs"); // cau hinh duoi ejs
  app.set("views", "./src/views"); // dia chi chua cac file su dung
};

export default configViewEngine;
