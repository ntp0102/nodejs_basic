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

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  getEditPage,
  postUpdateUser,
  deleteUser,
};
