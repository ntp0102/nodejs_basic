import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";

// var mime = require("mime-types");

let router = express.Router();

var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   // Uploads is the Upload_folder_name
  //   cb(null, process.cwd() + "/src/public/image/");
  // },
  // filename: function (req, file, cb) {
  //   cb(
  //     null,
  //     file.fieldname + "-" + Date.now() + path.extname(file.originalname)
  //   );
  // },
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    console.log(">>> check in function storage");
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const maxSize = 100 * 1000 * 1000;
let fileFilter = function (req, file, cb) {
  // Set the filetypes, it is optional
  // var filetypes = /jpeg|jpg|png/;
  // var mimetype = mime.lookup(file)
  // var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // if (mimetype && extname) {
  //   return cb(null, true);
  // }
  // cb("Error: File upload only supports the following filetypes ", filetypes);
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  console.log(file.originalname);
  cb(null, true);
};
let upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

let uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
}).array("multiple_file", 3);

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage); // chuyen sang controller xu ly truoc
  router.get("/detail/user/:userId", homeController.getDetailPage); // detail information user
  router.post("/create-new-user", homeController.createNewUser);
  router.get("/edit-user/:userId", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);
  router.post("/delete-user", homeController.deleteUser);

  router.get("/upload", homeController.uploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.post(
    "/upload-multiple-pic",
    (req, res, next) => {
      uploadMultiple(req, res, (err) => {
        console.log("Check in middlewave");
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          console.log("Check in err1");

          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        }
        else {
          // make sure to call next() if all was well
          console.log("Check in next()");
          next();
        }
      });
    },
    homeController.handleUploadMultipleFile
  );
  router.get("/about", (req, res) => {
    res.send(`I'm NTP`);
  });

  return app.use("/", router); //tiền tố mặc định của website, ở đây là không dùng gì cả, vidu /api/version
};

module.exports = initWebRoute;
