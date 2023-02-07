import pool from "../configs/connectDB";

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

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
};
