import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

let getHomepage = async (req, res) => {
  //logic

  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let user = await pool.execute("select * from `users` where id = ?", [id]);
  console.log("Check req params:", req.params);
  return res.send(JSON.stringify(user[0]));
};

let createNewUser = async (req, res) => {
  console.log(">>> Check req.body:", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users (firstName, lastName, email, address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );

  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute("select * from `users` where id = ?", [id]);
  console.log(user);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  console.log("check post update");
  // console.log(req.body);
  let { firstName, lastName, email, address, userId } = req.body;
  await pool.execute(
    "UPDATE `users` SET firstName = ?, lastName = ?, email=?, address=? WHERE id=?;",
    [firstName, lastName, email, address, userId]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let id = req.body.userId;
  console.log(id);
  await pool.execute("DELETE FROM `users` WHERE id=?", [id]);

  return res.redirect("/");
};

let uploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  console.log("check handleUploadFile");
  console.log(req.file);
  // TH nay co the khong can su dung ham upload ma co the dung truc tiep cac dong lenh ben trong do
  upload(req, res, function (err) {
    if (!req.file) {
      return res.send("Please select an file to upload");
    } else if (err instanceof multer.MulterError) {
      res.send(err);
      // } else if (err) {
      //   console.log("check2");
      //   console.log(err.field);
      //   console.log("check err", err);
      //   res.send(err);
    } else {
      // SUCCESS, image successfully uploaded
      res.send(
        `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr/> <a href="/upload">Upload another image</a>`
      );
    }
  });
};

let handleUploadMultipleFile = async (req, res) => {
  // console.log(">>> req.files:", req.files);
  // TH nay co the khong can su dung ham uploadMultiple ma co the dung truc tiep cac dong lenh ben trong do
  //  trong ham da tra ve san gia tri req.files la tat ca cac hinh anh su dung
  console.log(">>>check in handleupload");
  console.log(">>> req.files:", req.files);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an file to upload");
  }
  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  getEditPage,
  postUpdateUser,
  deleteUser,
  uploadFilePage,
  handleUploadFile,
  handleUploadMultipleFile,
};
