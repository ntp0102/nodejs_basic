import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./routes/web";
import initAPIRoute from "./routes/api";
import morgan from "morgan";
// import connection from './configs/connectDB'

require("dotenv").config(); //khai bao file .env

const app = express();
const port = process.env.PORT || 8080; // truong hop ko doc dc .env se chon 8080

app.use(express.urlencoded({ extended: true })); // gian luot hoa cac thong so gui len server
app.use(express.json());

//use morgan check log
app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(">>> run into my middlewave ");
  console.log(req.method);
  next();    //chay tiep code ben duoi
});
//setup viewEngine
configViewEngine(app);
//init web route
initWebroute(app);

initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
