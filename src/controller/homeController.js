import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  //logic

  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
  console.log(">>> Check rows:", rows);
};

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let user = await pool.execute("select * from `users` where id = ?", [id]);
  console.log("Check req params:", req.params);
  return res.send(JSON.stringify(user[0]));
};

module.exports = {
  getHomepage,
  getDetailPage,
};
